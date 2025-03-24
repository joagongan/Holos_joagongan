package com.HolosINC.Holos.payment;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentIntentCollection;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentListParams;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;


@Service
public class PaymentService {

    @Value("${stripe.key.secret}") // Inyecta el valor de la variable de entorno
    private String secretKey;
    private String returnUrl = "http://localhost:8080/api/v1";

    public PaymentIntent getById(String paymentIntentId) throws StripeException{
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent;
    }

    public PaymentIntentCollection getAll() throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntentListParams params = PaymentIntentListParams.builder()
            .build();
        return PaymentIntent.list(params);
    }

    public PaymentIntent createPayment(PaymentDTO paymentDTO) throws StripeException {
        Stripe.apiKey = secretKey;
        long amount = paymentDTO.getAmount();
        String currency = paymentDTO.getCurrency();
        return PaymentIntent.create(
            PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency(currency)
                    .build());
    }

    public PaymentIntent confirmPayment(String paymentIntentId, String paymentMethod) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        PaymentIntentConfirmParams params = PaymentIntentConfirmParams.builder()
                .setPaymentMethod(paymentMethod) // Método de pago (por ejemplo, "pm_card_visa")
                .setReturnUrl(returnUrl) 
                .build();
        return paymentIntent.confirm(params);
    }

    public PaymentIntent cancelPayment(String paymentIntentId) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent.cancel();
    }

}
