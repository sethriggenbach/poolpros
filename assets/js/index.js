
$(function() {
    
    $('#dealer-search-form').on('submit', function(e){

        e.preventDefault();
        e.stopPropagation();

        goToSearch();
    });

    function goToSearch() {
        window.location = "search.html?zip=" + document.getElementById('dealer-search-zip-input').value;
    }


});