package com.carservicemanager.carservicemanager.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;
// NOT : CORS AYARLARI BURADA YAPILMIŞTIR CASE KAPSAMINDA SECURITY KULLANILMAMIŞTIR TALEBİ BAĞLI İLERLEYEN AŞAMALARDA KULLANILABİLR
@Configuration
// metodların üstünde @secured veya @preauthorize yazabilmek için gerekli
// request matcher alternatifi olarak
// @EnableMethodSecurity(securedEnabled = true)
// @EnableGlobalMethodSecurity // deprecate oldu
public class SeConfig // extends WebSecurityCongigurerAdapter
{
    @Bean
    public SecurityFilterChain configure(HttpSecurity http, @Autowired AuthenticationConfiguration authenticationConfiguration) throws Exception
    {
        // sadece post işlemleri authenticated yapılabilir
        //		http.authorizeRequests().antMatchers(HttpMethod.POST).authenticated();
        // geri kalan bütün endpoint 'ler permit durumunda, bunu üsttekinden önce
        // yapamazsınız
        //		http.authorizeRequests().anyRequest().permitAll();
        // ------------------------------------------
        // save işlemini sadece admin rolündekiler yapsın gibi zaten authenticate
        // olmadan rol olmaz
        // önce anrequest yazarsam Can't configure antMatchers after anyRequest hatası
        // olur
        //		http.authorizeRequests().anyRequest().permitAll();
        // burası grantedauthority 'lere bakıyor
        // veritabanında role_user yazar burada user ile kontrol edersiniz
        // role isimleri standart değil abuziddin falan olabilir
        // belki de burada belirtmek yerine controller 'da @Secured veya @preauthorize
        // kullanınılabilir
        //		http.authorizeHttpRequests().requestMatchers(HttpMethod.DELETE).hasRole("SUPER");
        //		http.authorizeHttpRequests().requestMatchers("/ogretmen/deleteById/*").hasRole("SUPER");
        // ** baştan yazarsan o path içindeki herşeyi ezersin
        //		http.authorizeHttpRequests().requestMatchers("/ogretmen/**").hasRole("NORMAL");
        //		http.authorizeHttpRequests().anyRequest().permitAll();
        // -----------------------------------------
        // mvc için geçerli
        //		http.authorizeRequests().antMatchers("/error").permitAll();
        //		// hepsini birden istisnasız kapatmak için tek satır
        //		http.authorizeRequests().anyRequest().authenticated();
        // yukarısı eski metodlar
        // -----------------------------------------
        //http.authorizeHttpRequests(customizer -> customizer.requestMatchers("/dersogrenci/deletebyid/**").hasRole("ADMIN").anyRequest().permitAll());
        //		http.authorizeHttpRequests(customizer -> customizer.requestMatchers(HttpMethod.GET).hasRole("ADMIN"));
        //		http.authorizeHttpRequests(customizer -> customizer.anyRequest().authenticated());
        //		http.authorizeHttpRequests(customizer -> customizer.anyRequest().permitAll());
        // ------------------- buradan aşağı dokunma -------------
        // post yapabilmek için
        http.csrf(customizer -> customizer.disable());
        CorsConfigurationSource corsconsfigurationsource = new CorsConfigurationSource()
        {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request)
            {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedHeaders(List.of("*"));
                config.setAllowedOrigins(List.of("*"));
                config.setAllowedMethods(List.of("*"));

                return config;

            }
        };
        http.cors(customizer -> customizer.configurationSource(corsconsfigurationsource));
        // stateless, postman 'da request 'leri cache 'lememesi için, çünkü burası restull
        http.sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        // sırası muhtemelen önemlidir
//        http.addFilter(new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()));
        // login ' giderken önce token kontrolden geçmesin diye
//        http.addFilterAfter(new JWTAuthorizationFilter(), JWTAuthenticationFilter.class);
        return http.build();
    }
}