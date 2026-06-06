import { useMutation } from '@tanstack/react-query';
import { contactService } from '@/services/contact.service';

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload) => contactService.submitContactForm(payload),
  });
}

export function useNewsletterSubscribe() {
  return useMutation({
    mutationFn: (email) => contactService.subscribeToNewsletter(email),
  });
}

export function useSupportSubscription() {
  return useMutation({
    mutationFn: (payload) => contactService.supporterSubscription(payload),
  });
}
