package com.HolosINC.Holos.payment;

import lombok.Data;

@Data
public class PaymentDTO {
    Long amount;
    String description;
    String currency;


}
