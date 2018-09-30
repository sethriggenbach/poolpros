
$(function() {
    
    // $(".tooltip").on('mouseover', function(){
    //     title = $(this).attr('title');

    //     $(this).attr('title', "");

    //     var tooltip = document.createElement("div");
    //     tooltip.style.position = "fixed";
    //     tooltip.style.padding = "10px";
    //     tooltip.style.marginTop = "-30px";
    //     tooltip.style.backgroundColor = 'white';
    //     tooltip.style.zIndex = "9999";
    //     tooltip.innerText = title;
    //     $(this).prepend(tooltip);

    //     $(this).on("mouseout", function(){
    //         tooltip.remove();
    //         $(this).attr('title', title);
    //     });

    // });

    $('#dealer-search-form').on('submit', function(e){

        e.preventDefault();
        e.stopPropagation();

        goToSearch();
    });

    function goToSearch() {
        window.location = "search.html?zip=" + document.getElementById('dealer-search-zip-input').value;
    }

    document.getElementById('contact-form-close').addEventListener("click", function(){
        document.getElementById('contact-form-dialog').style.display = "none";
    });
});