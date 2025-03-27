import api from "./axiosInstance";

export type PaymentDTO = {
    amount: number;
    description: string;
};  

export const createStripeAccount = async () => {
    await api.post("/stripe-account/create");
};

export const getStripeAccountLink = async () => {
    const res = await api.get("/stripe-account/create-link");
    return res.data as string;
};

export const createPaymentIntent = async (paymentDTO: PaymentDTO, commissionId: number) => {
    const res = await api.post<string>( `/payment/create?commisionId=${commissionId}`, paymentDTO );
    const secret = res.data;
    return secret;
};