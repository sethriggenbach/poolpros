/* Here's all the mobile stuff */

$(document).ready(function(){
    
    var isMobileClient;
    var clientWidth;

    function determineIfMobile(){
        clientWidth = window.innerWidth;
        
        if(clientWidth < 801) {
            isMobileClient = true;
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
