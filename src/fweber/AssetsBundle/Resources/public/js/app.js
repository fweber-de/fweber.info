/*
 * fweber.info JS
 * © 2015, FLorian Weber
 */

$(document).ready(function() {

    var currentPage = $('#current-page').html();

    //active links
    $('#nl-' + currentPage).addClass('active');
    $('#nbl-' + currentPage).addClass('active');

    var picn = 2;

    setInterval(function() {
        $('.img-profile').attr('src', $('#src-pi-' + picn).html());
        picn++;

        if(picn > $('#profile-img-src-box').children().length) picn = 1;
    }, 5000);

    //public key
    var publicKey = null;

    $.get('https://keybase.io/fweber/key.asc', function(data) {
        publicKey = data;
        $('#key-area').html(data);
    });

    $('.fw-site-navigation').on('affixed.bs.affix', function() {
        $('#affix-title').css('display', 'block');
    });

    $('.fw-site-navigation').on('affixed-top.bs.affix', function() {
        $('#affix-title').css('display', 'none');
    });

});
