
(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        margin: 30,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Related Post carousel
    $(".related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        margin: 30,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
})(jQuery);


//Applying to XcelentHire Job Pool
//Applying to XcelentHire Job Pool
document.getElementById("myForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // stop the normal form submit

    const form = e.target;
    const submitBtn = form.querySelector("button[type='submit']");
    
    // Create a loading span if it doesn't exist
    let loadingSpan = document.getElementById("loadingText");
    if (!loadingSpan) {
        loadingSpan = document.createElement("span");
        loadingSpan.id = "loadingText";
        loadingSpan.textContent = " ⏳ Submitting...";
        loadingSpan.style.marginLeft = "10px";
        form.appendChild(loadingSpan);
    }

    // Show loading
    submitBtn.disabled = true;
    loadingSpan.style.display = "inline";

    const formData = new FormData(form); // automatically grabs all fields + files

    try {
        const res = await fetch("https://xcelenthire.onrender.com/submit-application", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            alert("✅ " + data.message); // show success
            form.reset(); // clear form
        } else {
            alert("❌ " + (data.error || "Submission failed"));
        }
    } catch (err) {
        console.error(err);
        alert("❌ Error submitting form. Check console for details.");
    } finally {
        // Hide loading
        submitBtn.disabled = false;
        loadingSpan.style.display = "none";
    }
});