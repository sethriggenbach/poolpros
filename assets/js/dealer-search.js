(function() {
    var dealerData;

    function ajax_get(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch(err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };
    
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    ajax_get("assets/js/data/dealers.json", function(data) {
        dealerData = data;
        searchByZip();
    });

    function searchByZip() {
        
        var userZip = window.location.search.substring(1);
        userZip = userZip.replace("zip=",""); // Not great 
        var allListings = "";
        var totalDealersFound = 0;

            for(var i=0;i<dealerData["dealers"].length;i++) {

                var dealer = dealerData["dealers"][i]["data"];

                if (dealer.zipcode == userZip) {
                    totalDealersFound += 1;
            
                    function getCertifications() {
                        var allItems = "";
                        for(x=0;x<dealer.certifications.length;x++) {
                            allItems += "<li class='"+ dealer.certifications[x].replace(" ","-").toLowerCase() + "'>" + dealer.certifications[x] + "</li>"; 
                        }
                        return allItems;
                    }

                    function getFilterCriteria() {
                        var allItems = "";
                        for(x=0;x<dealer.certifications.length;x++) {
                            allItems += " " + dealer.certifications[x].replace(" ","-").toLowerCase(); 
                        }
                        return allItems;
                    }

                    function displayHoursByDay() {
                        // This is complete overkill, but I really wanted to group hours together regardless of differences day-to-day, had fun with this!

                        var weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
                        var hoursArray = []; // Stores all hours for current dealer
                        var continuityTracker = []; // Keeps track of consecutive days with similar hours
                        var hoursDisplay = "";

                        for(weekDay in dealer.weekHours) {
                            var hours = dealer.weekHours[weekDay] || "Closed";
                    
                            hoursArray.push(hours);
                        }

                        for(var i=0;i<hoursArray.length;i++) {
                            if(hoursArray[i] === hoursArray[i+1]) {
                                continuityTracker.push([i]);
                            } else {
                                if (continuityTracker.length>0 ) {
                                    continuityTracker.push([i]);
                                    hoursDisplay += "<tr><td>" + weekDays[ [continuityTracker.shift() ] ] + " - " + weekDays[ [continuityTracker.pop()] ] + "</td><td>" + hoursArray[i] + "</td></tr>";
                                    continuityTracker = [];
                                } else {
                                    hoursDisplay += "<tr><td>" + weekDays[i] + "</td><td>" + hoursArray[i] +  "</td></tr>";
                                }

                            }
                        }

                        return hoursDisplay;
                    }

                    // template literal is more performant than appending a bunch of children! 
                    var template = `
                            <div class="card dropshadow ${getFilterCriteria()}">
                                <div class="card-header">
                                    <h1 class="card-title light">${dealer.name}</h1>
                                </div>
                                <div class="card-content">
                                <hr>

                                <a href="tel:${dealer.phone1}" class="icon-phone dealer-phone-display"><span class="tap-to-call">Tap to call</span>${dealer.phone1}</a>

                                <p class="italic">Can't talk now? Click below to send an email</p>
        
                                <p>
                                    <button class="btn-default btn-dealer-contact" data-dealer-name="${dealer.name}"><span class="ss-mail"></span> Contact This Pro</button>    
                                </p>
        
                                <h3>Business Hours</h3>
                                <table class="dealer-hours-display">
                                    ${displayHoursByDay()}
                                </table>
                                </div>
        
                                    <div class="card-footer">
                                        <ul class="dealer-services-list-wrapper">
                                                ${getCertifications()}                
                                        </ul>
                                    </div>
                            </div>    
                        `
                    allListings += template;

                }

                $("#user-zip-placeholder").text(userZip);
                $("#dealers-found-placeholder").text(totalDealersFound);
               
            }
            document.getElementById("dealer-container").innerHTML = allListings;

            $(".btn-dealer-contact").on("click",function(){
                dealerName = $(this).attr("data-dealer-name");
                $("#contact-form").trigger("reset");
                $(".contact-form-dealer-name-placeholder").text(dealerName);
                $("#contact-form-dialog").addClass("visible");
                $(".modal-overlay").addClass("visible");
            });
            $("#contact-form-close").on("click", function(){
                $("#contact-form-dialog").removeClass("visible")
                $(".modal-overlay").removeClass("visible");
            }); 
            $("#load-commercial-services-dialog").on("click",function(){
                $("#commercial-services-dialog").addClass("visible");
                $(".modal-overlay").addClass("visible");
            });
            $("#commercial-services-dialog-close").on("click",function(){
                $("#commercial-services-dialog").removeClass("visible");
                $(".modal-overlay").removeClass("visible");
                
            });
            $(".modal-overlay").on("click", function(){
                $(this).removeClass("visible");
                $("#commercial-services-dialog").removeClass("visible");
                $("#contact-form-dialog").removeClass("visible")
            });
    }


        
        $(".search-filter-list-item input").on("change", function(){
            filterResultsByService();
        });

        function filterResultsByService() {
             
            var allCheckboxes = document.getElementsByClassName("filter-checkbox");
            var allDealers = document.getElementsByClassName("card");
            var userSelection = []; 

            // populate array from checkbox selections

            for (i=0;i<allCheckboxes.length;i++) {
                var checkBox = allCheckboxes[i];
                if (checkBox.checked) {
                    userSelection.push(checkBox.value);
                }
            }
                    for (i = 0; i < allDealers.length; i++) {
                        var currentDealer = allDealers[i];
                        var totalMatch = true;

                        // test all checkbox filters against dealer classes                        
                        for (x=0;x<userSelection.length;x++) {
                            
                            if ( currentDealer.classList.contains(userSelection[x]) ) { 
                               
                            } else {
                                totalMatch = false;
                            }
                        }
                        
                        // only display dealer if dealer contains all classes selected
                        if (totalMatch == true) {
                            currentDealer.style.display = "";
                        } else {
                            currentDealer.style.display = "none";
                        }
                }
        }
})();