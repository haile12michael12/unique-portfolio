import { base44 } from './api/base44Client';

/**
 * Contact Service
 * Handles contact form submissions and inquiries
 */

export const contactService = {
  /**
   * Submit a contact form
   */
  submitContactForm: async (data) => {
    try {
      const { name, email, subject, message, type = 'inquiry' } = data;

      // Validate required fields
      if (!name || !email || !message) {
        throw new Error('Missing required fields: name, email, message');
      }

      // In production, call your backend API
      // const response = await base44.functions.submitContact({ 
      //   name, 
      //   email, 
      //   subject, 
      //   message, 
      //   type,
      //   submittedAt: new Date()
      // });

      // Mock response
      console.log('Contact form submitted:', { name, email, subject, message, type });
      return {
        success: true,
        message: 'Your message has been sent successfully',
        data: { name, email, subject, message, type },
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  /**
   * Submit a command from terminal interface
   */
  submitTerminalCommand: async (command, data = {}) => {
    try {
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
      const contactData = {
        email: data.email || 'not-provided@example.com',
        name: data.name || 'Anonymous',
        ...commandData,
      };

      return await contactService.submitContactForm(contactData);
    } catch (error) {
      console.error('Error submitting terminal command:', error);
      throw error;
    }
  },

  /**
   * Subscribe to newsletter
   */
  subscribeToNewsletter: async (email) => {
    try {
      if (!email || !email.includes('@')) {
        throw new Error('Invalid email address');
      }

      // In production, call your backend API
      // const response = await base44.functions.subscribeNewsletter({ email });

      console.log('Newsletter subscription:', email);
      return {
        success: true,
        message: 'Successfully subscribed to newsletter',
        email,
      };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  /**
   * Subscribe to supporter tier
   */
  supporterSubscription: async (data) => {
    try {
      const { email, tier, paymentMethod } = data;

      if (!email || !tier) {
        throw new Error('Missing required fields: email, tier');
      }

      // In production, call your backend/payment API
      // const response = await base44.functions.createSupporterSubscription({ 
      //   email, 
      //   tier, 
      //   paymentMethod,
      //   subscribedAt: new Date()
      // });

      console.log('Supporter subscription:', { email, tier, paymentMethod });
      return {
        success: true,
        message: `Successfully subscribed to ${tier} tier`,
        subscription: { email, tier, status: 'active' },
      };
    } catch (error) {
      console.error('Error creating supporter subscription:', error);
      throw error;
    }
  },
};

export default contactService;
