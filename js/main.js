
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
document.getElementById("myForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const overlay = document.getElementById("overlay");
    const successMessage = document.getElementById("successMessage");
    const submitBtn = form.querySelector("button[type='submit']");

    // Show blur + overlay
    form.classList.add("form-blur");
    overlay.style.display = "flex";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
        const res = await fetch("https://xcelenthire.onrender.com/submit-application", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            form.reset();
            successMessage.style.display = "block";
        } else {
            alert("❌ " + (data.error || "Submission failed"));
        }

    } catch (err) {
        console.error(err);
        alert("❌ Error submitting application. Try again!");
    } finally {
        // Remove blur + overlay
        form.classList.remove("form-blur");
        overlay.style.display = "none";
        submitBtn.disabled = false;
    }
});
//Start Hiring, leading to Calendly
document.getElementById("hireForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = this.contact_person.value;
    const email = this.email.value;

    window.location.href =
      `https://calendly.com/xcelenthire/30min?name=${name}&email=${email}`;
});