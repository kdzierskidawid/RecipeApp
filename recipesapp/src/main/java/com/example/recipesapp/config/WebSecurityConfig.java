package com.example.recipesapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.annotation.Resource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {



    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter authenticationTokenFilterBean() throws Exception {
        return new JwtAuthenticationFilter();
    }

    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {


        auth.inMemoryAuthentication().withUser("admin").password("{noop}admin").roles("ADMIN","USER");
        auth.inMemoryAuthentication().withUser("kapj").password("{noop}kapj").roles("USER");
        auth.inMemoryAuthentication().withUser("student").password("{noop}student").roles("STUDENT");
        //User.withDefaultPasswordEncoder().username("user").password("user").roles("USER").build();
    }

    //                .authorizeRequests().antMatchers("/recipes/*").hasAnyRole("ADMIN", "USER")
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/token/*").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/users/*").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/users/*/*").permitAll().and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/users/delete").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/confirm/registrationConfirm").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/photos/*/*").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/photos/*").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/recipes/*").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/recipes/*/*").permitAll()
                .and()
                .csrf().disable()
                .authorizeRequests().antMatchers("/recipes/name/*").permitAll()
                /* .and()
                 .csrf().disable()
                 .authorizeRequests().antMatchers("/users/*").permitAll()*/
                .and()
                .authorizeRequests().antMatchers("/all").permitAll()
                .and()
                .authorizeRequests().antMatchers("/getByEmail/*").permitAll()
                .and()
                .authorizeRequests().anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
    }



/*

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .inMemoryAuthentication()
                .withUser("user").password("password").authorities("ROLE_USER");
    }
*/

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
