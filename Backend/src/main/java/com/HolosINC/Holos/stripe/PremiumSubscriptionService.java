package com.HolosINC.Holos.stripe;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;
import com.HolosINC.Holos.model.BaseUserService;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;

import com.stripe.model.Subscription;

import com.stripe.param.CustomerCreateParams;
import com.stripe.param.SubscriptionCreateParams;



@Service
public class PremiumSubscriptionService {

    @Value("${stripe.key.secret}") 
    private String secretKey;

    private String priceId = "price_1R74KBPEFPLFpq6fosvWoTIi";

    private final BaseUserService userService;
    private final ArtistService artistService;
    

    @Autowired
    public PremiumSubscriptionService(BaseUserService userService, ArtistService artistService) {
        this.userService = userService;
        this.artistService = artistService;
    }  

    @Transactional
    public String createSubscription(String email, String paymentMethod, long artistId) throws StripeException {
        Stripe.apiKey = secretKey;
        Artist artist = artistService.findArtist(artistId);

        // Crear un cliente en Stripe (si aún no tienes uno)
        CustomerCreateParams customerParams = CustomerCreateParams.builder()
                .setEmail(email)
                .setPaymentMethod(paymentMethod)
                .setInvoiceSettings(CustomerCreateParams.InvoiceSettings.builder()
                    .setDefaultPaymentMethod(paymentMethod).build())
                .build();
        
        Customer customer = Customer.create(customerParams);

        // Crear la suscripción
        SubscriptionCreateParams subscriptionParams = SubscriptionCreateParams.builder()
                .setCustomer(customer.getId())
                .addItem(SubscriptionCreateParams.Item.builder()
                        .setPrice(priceId)
                        .build())
                .build();

        Subscription subscription = Subscription.create(subscriptionParams);

        artist.setSubscriptionId(subscription.getId());
        artistService.saveArtist(artist);
        return subscription.getId();
    }

    @Transactional
    public Subscription cancelSubscription(String subscriptionId) throws StripeException {
        Stripe.apiKey = secretKey;
        Subscription subscription = Subscription.retrieve(subscriptionId);
        return subscription.cancel();
    }

    @Transactional
    public boolean isArtistPremium(long artistId) {
        Stripe.apiKey = secretKey;
        Artist artist = artistService.findArtist(artistId);
        String subscriptionId = artist.getSubscriptionId();
        
        if (subscriptionId == null || subscriptionId.isEmpty()) {
            return false;
        }
        
        try {
            Subscription subscription = Subscription.retrieve(subscriptionId);
            return "active".equals(subscription.getStatus());
        } catch (StripeException e) {
            return false;
        }
    }

}