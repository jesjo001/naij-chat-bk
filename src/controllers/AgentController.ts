import { Request, Response, NextFunction } from 'express';
import Agent, { IAgent } from '../models/Agent.js';
import { logger } from '../utils/logger.js';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export class AgentController {
  /**
   * Get all agents for the current user
   */
  getUserAgents = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      logger.info(`Fetching agents for user: ${userId}`);
      const agents = await Agent.find({ userId }).sort({ createdAt: -1 });

      res.json({
        success: true,
        data: agents,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching user agents', { error });
      next(error);
    }
  };

  /**
   * Get a specific agent by ID
   */
  getAgent = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      logger.info(`Fetching agent: ${id}`);
      const agent = await Agent.findById(id);

      if (!agent) {
        res.status(404).json({
          success: false,
          error: 'Agent not found',
        });
        return;
      }

      // Check ownership
      if (agent.userId !== userId && !agent.isPublic) {
        res.status(403).json({
          success: false,
          error: 'Access denied',
        });
        return;
      }

      res.json({
        success: true,
        data: agent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching agent', { error });
      next(error);
    }
  };

  /**
   * Create a new agent
   */
  createAgent = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      const { name, description, systemPrompt, emoji, color, isPublic } = req.body;

      // Validation
      if (!name || !description || !systemPrompt) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields: name, description, systemPrompt',
        });
        return;
      }

      logger.info(`Creating new agent for user: ${userId}`);

      const newAgent = new Agent({
        userId,
        name: name.trim(),
        description: description.trim(),
        systemPrompt: systemPrompt.trim(),
        emoji: emoji || '🤖',
        color,
        isPublic: isPublic || false,
      });

      await newAgent.save();

      res.status(201).json({
        success: true,
        data: newAgent,
        message: 'Agent created successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error creating agent', { error });
      next(error);
    }
  };

  /**
   * Update an agent
   */
  updateAgent = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      logger.info(`Updating agent: ${id}`);

      const agent = await Agent.findById(id);

      if (!agent) {
        res.status(404).json({
          success: false,
          error: 'Agent not found',
        });
        return;
      }

      // Check ownership
      if (agent.userId !== userId) {
        res.status(403).json({
          success: false,
          error: 'Access denied',
        });
        return;
      }

      // Update allowed fields
      const updateFields = ['name', 'description', 'systemPrompt', 'emoji', 'color', 'isPublic'];
      updateFields.forEach((field) => {
        if (field in req.body) {
          (agent as any)[field] = req.body[field];
        }
      });

      await agent.save();

      res.json({
        success: true,
        data: agent,
        message: 'Agent updated successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error updating agent', { error });
      next(error);
    }
  };

  /**
   * Delete an agent
   */
  deleteAgent = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Unauthorized',
        });
        return;
      }

      logger.info(`Deleting agent: ${id}`);

      const agent = await Agent.findById(id);

      if (!agent) {
        res.status(404).json({
          success: false,
          error: 'Agent not found',
        });
        return;
      }

      // Check ownership
      if (agent.userId !== userId) {
        res.status(403).json({
          success: false,
          error: 'Access denied',
        });
        return;
      }

      await Agent.deleteOne({ _id: id });

      res.json({
        success: true,
        data: null,
        message: 'Agent deleted successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error deleting agent', { error });
      next(error);
    }
  };

  /**
   * Get public agents (community agents)
   */
  getPublicAgents = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching public agents');

      const agents = await Agent.find({ isPublic: true }).sort({ usageCount: -1 }).limit(20);

      res.json({
        success: true,
        data: agents,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching public agents', { error });
      next(error);
    }
  };

  /**
   * Increment agent usage count
   */
  incrementUsage = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      logger.info(`Incrementing usage for agent: ${id}`);

      const agent = await Agent.findByIdAndUpdate(
        id,
        { $inc: { usageCount: 1 } },
        { new: true }
      );

      if (!agent) {
        res.status(404).json({
          success: false,
          error: 'Agent not found',
        });
        return;
      }

      res.json({
        success: true,
        data: agent,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error incrementing agent usage', { error });
      next(error);
    }
  };
}
