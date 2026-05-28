/**
 * Analytics Service
 * Handles event tracking and analytics
 */

class AnalyticsService {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.loadUserId();
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate or load user ID
   */
  loadUserId() {
    let userId = localStorage.getItem('portfolio_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('portfolio_user_id', userId);
    }
    return userId;
  }

  /**
   * Track page view
   */
  trackPageView(page, title = '') {
    this.trackEvent('page_view', {
      page,
      title: title || document.title,
      url: window.location.href,
      referrer: document.referrer,
    });
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName, category = '') {
    this.trackEvent('button_click', {
      button_name: buttonName,
      category: category || 'general',
    });
  }

  /**
   * Track form submission
   */
  trackFormSubmission(formName, data = {}) {
    this.trackEvent('form_submission', {
      form_name: formName,
      ...data,
    });
  }

  /**
   * Track link click
   */
  trackLinkClick(linkName, url = '') {
    this.trackEvent('link_click', {
      link_name: linkName,
      url,
    });
  }

  /**
   * Track project view
   */
  trackProjectView(projectId, projectTitle = '') {
    this.trackEvent('project_view', {
      project_id: projectId,
      project_title: projectTitle,
    });
  }

  /**
   * Track blog post view
   */
  trackBlogView(postSlug, postTitle = '') {
    this.trackEvent('blog_view', {
      post_slug: postSlug,
      post_title: postTitle,
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(page, depth) {
    this.trackEvent('scroll_depth', {
      page,
      depth_percentage: Math.round(depth * 100),
    });
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(page, seconds) {
    this.trackEvent('time_on_page', {
      page,
      time_seconds: Math.round(seconds),
    });
  }

  /**
   * Track error
   */
  trackError(errorMessage, errorCode = '') {
    this.trackEvent('error', {
      message: errorMessage,
      code: errorCode,
      url: window.location.href,
    });
  }

  /**
   * Track custom event
   */
  trackEvent(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      userAgent: navigator.userAgent,
      ...data,
    };

    this.events.push(event);

    // In production, send to analytics backend
    this.sendToAnalytics(event);

    // Also log locally
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }

  /**
   * Send event to analytics backend
   */
  async sendToAnalytics(event) {
    try {
      // In production, send to your analytics service
      // await fetch('/api/analytics', { 
      //   method: 'POST', 
      //   body: JSON.stringify(event)
      // });

      // Store in localStorage for batch sending
      const storedEvents = JSON.parse(localStorage.getItem('portfolio_events') || '[]');
      storedEvents.push(event);
      localStorage.setItem('portfolio_events', JSON.stringify(storedEvents));
    } catch (error) {
      console.error('Error sending analytics:', error);
    }
  }

  /**
   * Get all tracked events
   */
  getEvents() {
    return this.events;
  }

  /**
   * Clear events
   */
  clearEvents() {
    this.events = [];
    localStorage.removeItem('portfolio_events');
  }

  /**
   * Get session summary
   */
  getSessionSummary() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      eventsCount: this.events.length,
      startTime: this.events[0]?.timestamp,
      endTime: this.events[this.events.length - 1]?.timestamp,
      events: this.events,
    };
  }
}

export const analytics = new AnalyticsService();

export default analytics;
