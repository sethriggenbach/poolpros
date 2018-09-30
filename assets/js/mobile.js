


$(document).ready(function(){
    
    var isMobileClient;

    function determineIfMobile(){
        var clientWidth = window.innerWidth;
        
        if(clientWidth < 800) {
            isMobileClient = true;
        } else {
            isMobileClient = false;
            $('#navigation-main').show();
        }

        console.log(isMobileClient);
    }

    $(document).ready(determineIfMobile);

    $(window).on('resize', determineIfMobile); 

    $('.close-mobile-nav').on('click', function(){
        if (isMobileClient) {
            $('#navigation-main').hide();
        }
    });

    $('#hamburger').on('click', function(){
        if (isMobileClient) {
            $('#navigation-main').show();
        }
    });


    $('#filter-results-title').on('click', function(){
        $('.mobile-expander-container').toggleClass('expanded');
        $('#search-filter-list-wrapper').toggleClass('expanded');
        $('#filter-results-title').toggleClass('expanded');
    });
    

});
