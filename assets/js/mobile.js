/* Here's all the mobile stuff */

$(document).ready(function(){
    
    var isMobileClient;
    var clientWidth;

    function determineIfMobile(){
        clientWidth = window.innerWidth;
        
        if(clientWidth < 801) {
            isMobileClient = true;
            $('#navigation-main').hide();
        } else {
            isMobileClient = false;
            $('#navigation-main').show();
        }

    }

    $(document).ready(determineIfMobile);

    $(window).on('resize', determineIfMobile); 

    $('#top-header').on('click','.close-mobile-nav', function(){
        if (isMobileClient) {
            $('#navigation-main').hide();
        }
    });

    $('#top-header').on('click','#hamburger', function(){
        if (isMobileClient) {
            $('#navigation-main').show();
        }
    });

    // Operates filter expander 

    $('#filter-results-title').on('click', function(){
        $('.mobile-expander-container').toggleClass('expanded');
        $('#search-filter-list-wrapper').toggleClass('expanded');
        $('#filter-results-title').toggleClass('expanded');
    });

});


function scrollToFormIfMobile(){
    // Scrolls to dealer contact form on smalll devices, muy importante 
        if (window.innerWidth < 801) {
            $("html,body").animate({
                scrollTop: $("#contact-form-dialog").offset().top - 10
            }, 300);
        }
}
