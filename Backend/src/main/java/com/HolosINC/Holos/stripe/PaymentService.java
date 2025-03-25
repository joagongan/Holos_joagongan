package com.HolosINC.Holos.stripe;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentIntentCollection;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.PaymentIntentListParams;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;


@Service
public class PaymentService {

    @Value("${stripe.key.secret}") // Inyecta el valor de la variable de entorno
    private String secretKey;
    private String returnUrl = "http://localhost:8080/api/v1";
    private Double commisionPercentage = 0.06;

    public PaymentIntent getById(String paymentIntentId) throws StripeException{
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent;
    }

    @Transactional
    public PaymentIntentCollection getAll() throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntentListParams params = PaymentIntentListParams.builder()
            .build();
        return PaymentIntent.list(params);
    }

    @Transactional
    public String createPayment(PaymentDTO paymentDTO, String sellerAccountId) throws StripeException {
        long commissionAmount = Math.round(paymentDTO.getAmount() * commisionPercentage);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount(paymentDTO.getAmount()) 
            .setCurrency(paymentDTO.getCurrency())
            .setApplicationFeeAmount(commissionAmount) //Comisión de nuestra aplicación
            .setTransferData(
                        PaymentIntentCreateParams.TransferData.builder()
                            .setDestination(sellerAccountId) // Enviar dinero al vendedor
                            .build())
            .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        
        return paymentIntent.getClientSecret();
    }
    

    @Transactional
    public PaymentIntent confirmPayment(String paymentIntentId, String paymentMethod) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        PaymentIntentConfirmParams params = PaymentIntentConfirmParams.builder()
                .setPaymentMethod(paymentMethod) // Método de pago (por ejemplo, "pm_card_visa")
                .setReturnUrl(returnUrl) 
                .build();
        return paymentIntent.confirm(params);
    }

    @Transactional
    public PaymentIntent cancelPayment(String paymentIntentId) throws StripeException {
        Stripe.apiKey = secretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent.cancel();
    }

}
