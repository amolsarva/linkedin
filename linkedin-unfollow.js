(function() {
    function log(m) {
        console.log('%c[LinkedIn] ' + m, 'color:#0073b1;font-weight:bold');
    }
    
    if (!window.location.hostname.includes('linkedin.com')) {
        log('Please run this on a LinkedIn page');
        return;
    }
    
    var t = document.body.innerText;
    if (!t.includes('Recruiter') && !t.includes('Talent Acquisition')) {
        log('This profile is not relevant.');
        return;
    }

    try {
        let b = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('More') || (b.getAttribute('aria-label') || '').includes('More actions'));
        if (!b) {
            log('Could not find More button. Are you on a profile page?');
            return;
        }
        log('Found More button, clicking...');
        b.click();
        
        setTimeout(function() {
            let r = Array.from(document.querySelectorAll('span.display-flex.t-normal.flex-1')).find(s => s.textContent.trim() === 'Remove Connection');
            if (!r) {
                log('Could not find Remove Connection span.');
                return;
            }
            log('Found Remove Connection span, clicking parent...');
            let c = r.closest('div[role="menuitem"]') || r.parentElement;
            if (!c) {
                log('Could not find clickable parent element');
                return;
            }
            c.click();
            log('Unfollow action triggered! Waiting for confirmation...');
            setTimeout(() => {
                if (!document.querySelector('span.display-flex.t-normal.flex-1') || !document.querySelector('span.display-flex.t-normal.flex-1').textContent.includes('Add')) {
                    log('Unfollow action completed successfully. Closing tab...');
                    window.close();
                } else {
                    log('Unfollow action did not complete as expected.');
                }
            }, 1500);
        }, 1500);
    } catch (e) {
        log('Error: ' + e.message);
    }
})();
