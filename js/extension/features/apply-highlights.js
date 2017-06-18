/**
 *
 * Discogs Enhancer
 *
 * @author: Matthew Salcido
 * @website: http://www.msalcido.com
 * @github: https://github.com/salcido
 *
 */

$(document).ready(function() {

  let
      href = window.location.href,
      //
      sellPage = href.includes('/sell/list'),
      sellRelease = href.includes('/sell/release'),
      sellerPage = href.includes('/seller'),
      wantsPage = href.includes('/sell/mywants');


  /**
   * Find all Marketplace item conditions and apply classes
   * @method applyStyles
   * @return {undefined}
   */

  window.applyStyles = function applyStyles() {

    // Remove mobile clutter
    $('.condition-label-mobile').remove();

    // Media conditions
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Mint (M)")').addClass('mint bold');
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Near Mint (NM or M-)")').addClass('near-mint bold');
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Very Good Plus (VG+)")').addClass('very-good-plus bold');
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Very Good (VG)")').addClass('very-good bold');
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Good Plus (G+)")').addClass('good-plus bold');
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Good (G)")').addClass('good bold');
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Fair (F)")').addClass('fair bold');
    $('p.item_condition').find('.condition-label-desktop:first').next(':contains("Poor (P)")').addClass('poor bold');

    // Sleeve conditions
    $('span.item_sleeve_condition:contains("Mint (M)")').addClass('mint bold');
    $('span.item_sleeve_condition:contains("Near Mint (NM or M-)")').addClass('near-mint bold');
    $('span.item_sleeve_condition:contains("Very Good Plus (VG+)")').addClass('very-good-plus bold');
    $('span.item_sleeve_condition:contains("Very Good (VG)")').addClass('very-good bold');
    $('span.item_sleeve_condition:contains("Good Plus (G+)")').addClass('good-plus bold');
    $('span.item_sleeve_condition:contains("Good (G)")').addClass('good bold');
    $('span.item_sleeve_condition:contains("Fair (F)")').addClass('fair bold');
    $('span.item_sleeve_condition:contains("Poor (P)")').addClass('poor bold');
  };

  // Apply styles on ready/prev/next clicks
  if ( sellPage || sellRelease || sellerPage || wantsPage ) {

    window.applyStyles();

    $('body').on('click', '.pagination_next, .pagination_previous', function() {

      $(document).ajaxSuccess(function() {

        window.applyStyles();
      });
    });
  }
});
