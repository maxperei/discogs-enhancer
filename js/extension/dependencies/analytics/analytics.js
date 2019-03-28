/**
 *
 * Discogs Enhancer
 *
 * @author: Matthew Salcido
 * @website: http://www.msalcido.com
 * @github: https://github.com/salcido
 *
 */

let analytics = localStorage.getItem('analytics') || true;

analytics = JSON.parse(analytics);

if ( analytics ) {

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-75073435-1', 'auto');
  ga('set', 'anonymizeIp', true);
  ga('set', 'checkProtocolTask', function() { });
  ga('require', 'displayfeatures');
  ga('send', 'pageview', '/popup.html');
}
