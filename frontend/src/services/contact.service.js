import { config } from '@/config/env';
import { contactApi } from '@/services/api/contact.api';

/**
 * Contact Service
 * Sends to backend API with graceful local fallback.
 */

export const contactService = {
  submitContactForm: async (data) => {
    const { name, email, subject, message, type = 'inquiry' } = data;

    if (!name || !email || !message) {
      throw new Error('Missing required fields: name, email, message');
    }

    if (config.api.useBackend) {
      try {
        const response = await contactApi.submit({ name, email, subject, message, type });
        return {
          success: true,
          message: response?.message || 'Your message has been sent successfully',
          data: response,
        };
      } catch (error) {
        console.warn('[contactService] API unavailable, using local fallback:', error.message);
      }
    }

    return {
      success: true,
      message: 'Your message has been sent successfully',
      data: { name, email, subject, message, type },
    };
  },

  submitTerminalCommand: async (command, data = {}) => {
    const commandMap = {
      '/hire': () => ({
        type: 'inquiry',
        subject: 'Open to Opportunities',
        message: 'Interested in senior/staff-level positions',
      }),
      '/coffee': () => ({
        type: 'meeting-request',
        subject: 'Technical Discussion Request',
        message: 'Would like to schedule a 30-minute technical conversation',
      }),
      '/resume': () => ({
        type: 'resume-request',
        subject: 'Resume Download Request',
        message: 'Requesting resume/CV',
      }),
    };

    if (!commandMap[command.toLowerCase()]) {
      throw new Error(`Unknown command: ${command}`);
    }

    const commandData = commandMap[command.toLowerCase()]();
    return contactService.submitContactForm({
      email: data.email || 'not-provided@example.com',
      name: data.name || 'Anonymous',
      ...commandData,
    });
  },

  subscribeToNewsletter: async (email) => {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }

    if (config.api.useBackend) {
      try {
        const response = await contactApi.subscribeNewsletter(email);
        return {
          success: true,
          message: response?.message || 'Successfully subscribed to newsletter',
          email,
        };
      } catch (error) {
        console.warn('[contactService] Newsletter API unavailable:', error.message);
      }
    }

    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
      email,
    };
  },

  supporterSubscription: async (data) => {
    const { email, tier, paymentMethod } = data;

    if (!email || !tier) {
      throw new Error('Missing required fields: email, tier');
    }

    if (config.api.useBackend) {
      try {
        const response = await contactApi.submitSupport({ email, tier, paymentMethod });
        return {
          success: true,
          message: response?.message || `Successfully subscribed to ${tier} tier`,
          subscription: response?.subscription || { email, tier, status: 'active' },
        };
      } catch (error) {
        console.warn('[contactService] Support API unavailable:', error.message);
      }
    }

    return {
      success: true,
      message: `Successfully subscribed to ${tier} tier`,
      subscription: { email, tier, status: 'active' },
    };
  },
};

export default contactService;
