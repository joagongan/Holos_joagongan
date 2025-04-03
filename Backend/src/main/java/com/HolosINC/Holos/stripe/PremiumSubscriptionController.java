package com.HolosINC.Holos.stripe;

import com.stripe.model.Subscription;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stripe-subsciption")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Stripe Subscription Controller", description = "API for managing Stripe Subscriptions")
public class PremiumSubscriptionController {

    @Autowired
    private PremiumSubscriptionService stripeService;

    @PostMapping("/create")
    public ResponseEntity<String> createSubscription(@RequestParam String paymentMethod) throws Exception{
        String accountId = stripeService.createSubscription(paymentMethod);
        return new ResponseEntity<String>(accountId, HttpStatus.OK);
    }

    @PostMapping("/delete/{subscriptionId}")
    public ResponseEntity<String> cancelSubscription(@RequestParam String subscriptionId) throws Exception{
        Subscription subscription = stripeService.cancelSubscription(subscriptionId);
        String subscriptionString = subscription.toJson();
        return new ResponseEntity<String>(subscriptionString, HttpStatus.OK);
    }

}
