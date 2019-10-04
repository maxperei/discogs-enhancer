/**
 *
 * Discogs Enhancer
 *
 * @author; Max Perei
 * @website: https://maxperei.info
 * @github: https://github.com/maxperei
 *
 * ---------------------------------------------------------------------------
 * Overview
 * ---------------------------------------------------------------------------
 *
 * Enable - for any user - the ability to preview a track on click by launching a YouTube iframe.
 *
 * Displays a clickable icon next to a `.tracklist_track` within a release page.
 * This make a call to YouTube search API v3 with a query based on page metadata
 * which is supposed to retrieve a YouTube Id forwarded through an iframe to the DOM.
 *
 */

rl.ready(() => {

    function bindEvents(e) {
        const elems = e.currentTarget.parentElement.children;
        const pageTitle = document.head.querySelector('[property~="og:title"][content]').content;
        //
        const trackName = sanitizeString(elems[elems.length - 2].children[0].textContent);
        let artistName = sanitizeString(pageTitle.split('-')[0]);
        if (elems[elems.length - 3].className === 'tracklist_track_artists') {
            artistName = sanitizeString(elems[elems.length - 3].textContent);
        }
        if (artistName === 'Various' || artistName === '') {
            artistName = sanitizeString(pageTitle.split('-')[1]);
        }

        let query = formatQuery(artistName, trackName);

        getVideo(query);
    }

    function sanitizeString(str) {
        return str.replace(/[*()'"#,–&]/g, '').trim();
    }

    function formatQuery(...strings) {
        let query = '';
        let i = 1;
        strings.forEach(function (string) {
            query += string.replace(/ /g, ',');
            if (i !== strings.length) {
                query += ',';
            }
            i++;
        });
        return query;
    }

    function getVideo(query) {
        let url = 'https://www.googleapis.com/youtube/v3/search?';
        url += 'key=' + ytApiKey;
        url += '&part=snippet';
        url += '&maxResults=1';
        url += '&type=video';
        getJSON(url + '&q=' + query, function (err, data) {
            if (err != null) {
                console.log(err);
            } else {
                if (data.items.length > 0) {
                    const YtId = data.items[0].id.videoId;
                    popIframe(YtId);
                }
            }
        });
    }

    function getJSON(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    }

    function popIframe(ytId) {
        const iframe = `
            <iframe width="420" height="315"
                src="https://www.youtube.com/embed/${ytId}">
            </iframe>
        `;
        document.getElementById('page').insertAdjacentHTML('beforebegin', iframe);
    }

    let ytApiKey = rl.getItem('userPreferences').ytApiKey;

    document.querySelectorAll('.tracklist_track:not(.track_heading)').forEach(track => {
        let html = `
            <td class="enhance_track_preview" width="20">
                <a href="javascript:void(0);">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M75.04,63.38c-0.65,1.11-1.37,2.17-2.15,3.18h-0.01  c-5.45,7.05-14.02,11.59-23.65,11.59c-1.31,0-2.61-0.08-3.87-0.25c-1.65,0.93-2.1,2.18-4.21,4.11c-2.7,2.48-2.85,7.27-2.5,9.21  c0.1,0.54,0.43,1.15,0.85,1.75c3.14,0.67,6.39,1.03,9.73,1.03c4.46,0,8.77-0.63,12.85-1.82c0.56-1.3,0.46-4.09,0.46-4.09l-0.66,0.01  c14.3-4.52,25.26-16.48,28.3-31.31c0.66-0.1,2.43-0.43,3.16-1.18c0.42-0.44,0.9-0.91,1.28-1.29C94.87,52.4,95,50.43,95,48.44  c0-0.98-0.03-1.95-0.09-2.91c-1.14-1.18-2.5-2.02-3.18-2.32c-1.21-0.54-6.93-0.66-10.12-0.67c-3.19-0.01-4.57-1.19-5.16-1.88  L48.23,24.74c-0.58-1.33-0.54-2.9,0.25-4.25c0.44-0.75,1.06-1.34,1.78-1.75c11.52,0.39,21.39,7.27,26.01,17.09  c2.3,2.05,3.5,1.43,6.87,2.48c2.43,0.75,5.21-0.13,7.18-1.17c0.9-0.63,2.18-1.62,2.6-2.33c-2.3-7.29-6.37-13.79-11.73-18.99  c-0.05-0.02-0.1-0.03-0.13-0.03c-1.11-0.11-3.38,1.21-4.02,1.6C69.66,10.82,59.91,6.83,49.23,6.83c-4.32,0-8.5,0.66-12.42,1.87  c-0.34-0.43-1.62-1.98-2.7-2.26C33.59,6.3,33.02,6.14,32.53,6c-2.96,1.16-5.78,2.61-8.4,4.33c-0.4,1.48-0.44,2.93-0.37,3.64  c0.13,1.32,3.58,5.94,5.17,8.71c1.24,2.15,1.04,3.59,0.89,4.12l-0.18,34.7c-0.87,1.21-2.29,1.99-3.89,1.99  c-1.02,0-1.98-0.32-2.75-0.87c-2.31-4.21-3.62-9.05-3.62-14.18c0-6.51,2.1-12.52,5.66-17.41c0.62-2.99-0.51-3.73-1.28-7.16  c-0.55-2.49-2.73-4.46-4.62-5.65c-0.95-0.44-2.32-1.01-3.18-1.08C10.81,22.57,6.99,29.25,5,36.68c0.01,0.12,0.03,0.2,0.06,0.27  c0.43,0.98,2.59,2.23,3.33,2.64c-0.62,2.85-0.95,5.81-0.95,8.85c0,12.19,5.27,23.16,13.67,30.77c-0.25,0.68-0.79,2.29-0.54,3.24  c0.17,0.63,0.34,1.34,0.46,1.88c2.15,1.67,4.45,3.16,6.88,4.44c2-0.24,3.92-1.24,4.66-1.78c1.07-0.77,3.37-6.04,4.99-8.79  c0.48-0.83,0.98-1.42,1.44-1.84l-0.09-0.03l0.39-0.22c0.46-0.37,0.86-0.57,1.16-0.67l30.66-17.62c1.36,0.2,2.62,1,3.36,2.31  C75.07,61.16,75.23,62.31,75.04,63.38z M41.27,48.44c0-4.38,3.57-7.93,7.96-7.93c4.4,0,7.96,3.55,7.96,7.93  c0,4.37-3.56,7.92-7.96,7.92C44.84,56.36,41.27,52.81,41.27,48.44z"/>
                    </svg>
                </a>
            </td>
        `;
        track.insertAdjacentHTML('afterbegin', html);
    });

    document.querySelectorAll('.enhance_track_preview').forEach(elem => {
        if (null !== ytApiKey) {
            elem.addEventListener('click', bindEvents);
        }
    });
});