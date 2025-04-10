package com.HolosINC.Holos.stripe;

import com.HolosINC.Holos.exceptions.ResourceNotFoundException;
import com.stripe.exception.StripeException;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;


@RestController
@RequestMapping("/api/v1/payment")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Payment Controller", description = "API for managing Payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    @PostMapping("/create/{commissionId}")
    public ResponseEntity<?> createPayment(@RequestBody PaymentDTO paymentDTO, @PathVariable long commissionId) throws Exception {
        try {
            String paymentIntent = paymentService.createPayment(paymentDTO, commissionId);
            return new ResponseEntity<>(paymentIntent, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("Comisión o artista no encontrado: " + e.getMessage());
        } catch (IllegalStateException e) {
            throw new ResourceNotFoundException(e.getMessage());
        } catch (IllegalArgumentException e) {
            throw new ResourceNotFoundException(e.getMessage());
        } catch (StripeException e) { 
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_GATEWAY);
        } catch (Exception e) {
            throw new Exception("Error inesperado al crear el pago: " + e.getMessage());
        }
    }
}