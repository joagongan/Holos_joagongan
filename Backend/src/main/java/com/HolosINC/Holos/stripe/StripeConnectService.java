package com.HolosINC.Holos.stripe;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HolosINC.Holos.artist.Artist;
import com.HolosINC.Holos.artist.ArtistService;

import com.HolosINC.Holos.model.BaseUserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.param.AccountListParams;
import com.stripe.model.AccountLink;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;


@Service
public class StripeConnectService {

    @Value("${stripe.key.secret}") 
    private String secretKey;
    private String returnUrl = "http://localhost:8080/api/v1";
    private String refreshUrl = "http://localhost:8080/api/v1"; //Esta página habría que cambiarla, aquí se reedirige al usuario si no ha podido generar el enlace correctamente

    private final BaseUserService userService;
    private final ArtistService artistService;
    

    @Autowired
    public StripeConnectService(BaseUserService userService, ArtistService artistService) {
        this.userService = userService;
        this.artistService = artistService;
    }  

    @Transactional
    public List<Account> getAllConnectedAccounts() throws StripeException {
        Stripe.apiKey = secretKey;
        AccountListParams params = AccountListParams.builder().build();
        List<Account> accounts = Account.list(params).getData();
        return accounts;
    }

    @Transactional
    public Account getById(String accountId) throws StripeException{
        Stripe.apiKey = secretKey;
        Account account = Account.retrieve(accountId);
        return account;
    }

    @Transactional
    public String createConnectedAccount(String email) throws StripeException {
        Stripe.apiKey = secretKey;
/*        BaseUser activeUser = userService.findCurrentUser();
         Artist artist = artistService.findArtistByUserId(activeUser.getId());

        if (artist.getSellerAcountId() == null) {
            throw new IllegalStateException("El usuario no tiene una cuenta de Stripe asociada.");
        } */
        
        AccountCreateParams params = AccountCreateParams.builder()
                .setType(AccountCreateParams.Type.EXPRESS) 
                .setCountry("ES") 
                //.setEmail(activeUser.getEmail())
                .setEmail(email)
                .build();

        Account account = Account.create(params);
/*         artist.setSellerAcountId(account.getId());
        artistService.saveArtist(artist); */

        return account.getId(); 
    }

    @Transactional
    public String createAccountLink(String sellerAccountId) throws StripeException {
        /* 
        Long userId = userService.findCurrentUser().getId();
        Artist artist = artistService.findArtistByUserId(userId);

        if (artist.getSellerAcountId() == null) {
            throw new IllegalStateException("El usuario no tiene una cuenta de Stripe asociada.");
        } */

        AccountLinkCreateParams params = AccountLinkCreateParams.builder()
            //.setAccount(artist.getSellerAcountId())
            .setAccount(sellerAccountId)
            .setRefreshUrl(refreshUrl) // Redirigir en caso de error
            .setReturnUrl(returnUrl) // Redirigir tras completar
            .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
            .build();

    AccountLink accountLink = AccountLink.create(params);
    return accountLink.getUrl();
    }
}
