// JQuery

$(document).ready(function() {

  // Toggles

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".sidebar").toggleClass("is-active");
      $(".wrap").toggleClass("is-active");

  });

  // Modals

  // Open the modal
  $(".modal-button").click(function() {

    $(".modal").addClass("is-active");

  });

  // Close the modal

  $(".modal-close").click(function() {

    $(".modal").removeClass("is-active");

  });

  $(".modal-background").click(function() {

    $(".modal").removeClass("is-active");

  });

});
