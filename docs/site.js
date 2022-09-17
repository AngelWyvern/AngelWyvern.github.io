let prefsVisible = false;
const prefsWhitelist = ['prefs-base', 'prefs-arrow', 'prefs-menu', 'prefs-button'];

document.addEventListener('DOMContentLoaded', () =>
{
	/* START: Cookie loading */
	if (getCookie('theme') == 'lite')
	{
		document.querySelector('#theme').href = 'lite.css';
	}
	if (getCookie('minNavBar') == 'true')
	{
		document.body.classList.add('minNavBar');
	}
	/* END: Cookie loading */

	const blur = document.querySelector('#blur');

	blur.addEventListener('click', (e) =>
	{
		if (e.target == blur && !blur.hasAttribute('disabled'))
		{
			blur.setAttribute('disabled', '');

			const modal = document.querySelector('.discord-modal');
			
			if (modal)
			{
				modal.setAttribute('style', 'transform: scale(0) !important;'); // priority
				setTimeout(() => { if (modal) modal.remove(); }, 100);
			}
		}
	});

	document.querySelectorAll('.typed').forEach((e) =>
	{
		const ms = parseInt(e.getAttribute('ms'));
		const delay = parseInt(e.getAttribute('delay'));
		const finalText = e.getAttribute('text');
		
		setTimeout(() =>
		{
			let text = '';

			const interval = setInterval(() =>
			{
				text += finalText[text.length];
				e.innerText = text;
				if (text.length >= finalText.length)
					clearInterval(interval);
			}, ms);
		}, delay);
	});
	
	requestAnimationFrames(() => document.body.removeAttribute('loading'), 2); // getting the second animation frame after fully loaded
});

document.addEventListener('click', e =>
{
	if (prefsVisible && e.target)
	{
		let doClose = true;
		prefsWhitelist.forEach(classname =>
		{
			doClose = doClose && !e.target.classList.contains(classname);
		});
		if (doClose) setTimeout(hidePrefs, 10);
	}
});

window.addEventListener('resize', () =>
{
	if (prefsVisible) hidePrefs();
});

function popupDiscord()
{
	const blur = document.querySelector('#blur');
	
	if (blur)
	{
		blur.removeAttribute('disabled');
	
		const modal = InitializeElement('div', { "className":"content discord-modal", "attributes":[['transition', 'pre']] });
	
		const top = InitializeElement('div', { "className":"content discord-modal-top" });
		modal.appendChild(top);
	
		const bottom = InitializeElement('div', { "className":"content discord-modal-bottom" });
		modal.appendChild(bottom);
	
		const avatar = InitializeElement('div', { "className":"discord-avatar" });
		top.appendChild(avatar);
	
		const name = InitializeElement('div', { "className":"discord-usertag", "innerHTML":`Chimera<span style="color: #b9bbbe;">#1424</span>` });
		top.appendChild(name);

		const info = InitializeElement('div', { "className":"discord-info", "innerText":"About Me" });
		bottom.appendChild(info);

		const text = InitializeElement('div', { "className":"discord-text" });
		text.innerHTML = `<strong>SHORT</strong><br>Your average gamer.<br><br><strong>LONG</strong><br>Hey all, I am a freelance programmer who enjoys video games and hosts servers for people's enjoyment (<a href="https://vortexpolygonal.tf/">https://vortexpolygonal.tf/</a>).`;
		bottom.appendChild(text);
	
		blur.appendChild(modal);
		
		requestAnimationFrame(() =>
		{
			if (modal) modal.setAttribute('transition', 'post');
			setTimeout(() => { if (modal) modal.removeAttribute('transition'); }, 125);
		});
	}
}

function showPrefs()
{
	if (prefsVisible) return;
	prefsVisible = true;
	const gear = document.querySelector('#gear');
	if (gear)
	{
		const rect = gear.getBoundingClientRect();

		const base = InitializeElement('div', { "className":"prefs-base content", "attributes":[["pretransition"]] });
		requestAnimationFrame(() => { if (base) base.removeAttribute('pretransition'); });

		const arrow = InitializeElement('div', { "className":"prefs-arrow" });
		base.appendChild(arrow);

		const menu = InitializeElement('div', { "className":"prefs-menu content" });
		
		const themeToggle = InitializeElement('a', { "className":"prefs-button", "innerText":"Toggle Theme", "href":"javascript:toggleTheme()" });
		menu.appendChild(themeToggle);
		
		const minNavToggle = InitializeElement('a', { "className":"prefs-button", "innerText":"Toggle Minimal Navigation", "href":"javascript:toggleMinNav()" });
		menu.appendChild(minNavToggle);
		
		base.appendChild(menu);

		document.querySelector('#main').appendChild(base);
		base.style.top = rect.bottom + 'px';
		base.style.left = ((rect.left + (rect.width / 2)) - (base.clientWidth / 2)) + 'px';

		const menuRect = menu.getBoundingClientRect();
		if (menuRect.right > window.innerWidth) menu.style.transform = `translateX(${window.innerWidth - menuRect.right}px)`;
		else if (menuRect.left < 0) menu.style.transform = `translateX(${-menuRect.left}px)`;

		gear.setAttribute('current', '');
	}
}

function hidePrefs()
{
	if (!prefsVisible) return;
	prefsVisible = false;
	document.querySelector('.prefs-base').remove();
	const gear = document.querySelector('#gear');
	if (gear) gear.removeAttribute('current');
}

function toggleTheme()
{
	const theme = document.querySelector('#theme');
	if (theme.href.endsWith('/dark.css'))
	{
		theme.href = 'lite.css';
		setCookie('theme', 'lite');
	}
	else
	{
		theme.href = 'dark.css';
		setCookie('theme', 'dark');
	}
}

function toggleMinNav()
{
	document.body.classList.contains('minNavBar') ? document.body.classList.remove('minNavBar') : document.body.classList.add('minNavBar');
	setCookie('minNavBar', document.body.classList.contains('minNavBar') ? 'true' : 'false');
	hidePrefs();
}

// Thanks Grepper for these two functions
function setCookie(name,value,days)
{
    var expires = "";
    if (days)
	{
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i=0; i < ca.length; i++)
	{
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/* START: KC Secret */
// Chicken and Cheese told me to do this
let kcode = 0, kr = 0, kg = 0, kb = 0;
function checkKKey(key, e)
{
	if (e.code == key)
	{
		kcode++;
		// console.log('Matched key: ' + key);
		return true;
	}
	kcode = 0;
	if (e.code == 'ArrowUp') // If user is retrying from the beginning
		kcode++;
	// console.log('Found key: ' + e.code + ' while looking for key: ' + key);
	return false;
}
document.addEventListener('keydown', e =>
{
	switch (kcode)
	{
		case 0:
			checkKKey('ArrowUp', e);
			break;
		case 1:
			checkKKey('ArrowUp', e);
			break;
		case 2:
			checkKKey('ArrowDown', e);
			break;
		case 3:
			checkKKey('ArrowDown', e);
			break;
		case 4:
			checkKKey('ArrowLeft', e);
			break;
		case 5:
			checkKKey('ArrowRight', e);
			break;
		case 6:
			checkKKey('ArrowLeft', e);
			break;
		case 7:
			checkKKey('ArrowRight', e);
			break;
		case 8:
			checkKKey('KeyB', e);
			break;
		case 9:
			checkKKey('KeyA', e);
			break;
		case 10:
			if (checkKKey('Enter', e))
			{
				console.log('Activated KC secret!!');
				document.body.style.transition = 'none'; // prevent computing transitions, krgb is smooth enough
				setInterval(krgbTimer, 10);
			}
			break;
	}
});
function krgbTimer() // thanks https://stackoverflow.com/a/66715824
{
	if (kr < 255 && kg == 0 && kb == 0)
		kr++;
	else if (kr == 255 && kg < 255 && kb == 0)
		kg++;
	else if (kr > 0 && kg == 255 && kb == 0)
		kr--;
	else if (kr == 0 && kg == 255 && kb < 255)
		kb++;
	else if (kr == 0 && kg > 0 && kb == 255)
		kg--;
	else if (kr < 255 && kg == 0 && kb == 255)
		kr++;
	else if (kr == 255 && kg == 0 && kb > 0)
		kb--;
	document.body.style.background = `rgb(${kr}, ${kg}, ${kb})`;
}
/* END: KC Secret */

/* START: Fun code */
function requestAnimationFrames(func, num)
{
	if (num <= 0) func();
	else requestAnimationFrame(() => requestAnimationFrames(func, num - 1));
}

/** 
 * Initialize a DOM Element
 * 
 * @param {string} tag REQUIRED: Element Tag Name 
 * @param {Object} [options] OPTIONAL: Element JSON Options
 * 
 * @param {string} [options.id] OPTIONAL: Element ID Name
 * @param {string} [options.className] OPTIONAL: Element Class Name
 * @param {string} [options.style] OPTIONAL: Element Attributes
 * @param {Array} [options.attributes] OPTIONAL: Element Attributes
 * @param {string} [options.innerHTML] OPTIONAL: Element Inner HTML
 * @param {string} [options.innerText] OPTIONAL: Element Inner Text
 * @param {string} [options.href] OPTIONAL: HREF Link
 * 
 * @returns {HTMLElement} New HTML Element
 */
 function InitializeElement(tag, options = null)
 {
	 var element = document.createElement(tag);
	 if (options != null)
	 {
		 for (const key in options)
		 {
			 if      (key == 'id')         element.id = options.id;
			 else if (key == 'className')  element.className = options.className;
			 else if (key == 'style')      element.setAttribute('style', options.style);
			 else if (key == 'attributes') options.attributes.forEach(keyvalue => element.setAttribute(keyvalue[0], (keyvalue[1] != undefined) ? keyvalue[1] : ''));
			 else if (key == 'innerHTML')  element.innerHTML = options.innerHTML;
			 else if (key == 'innerText')  element.innerText = options.innerText;
			 else if (key == 'href')       element.href = options.href;
		 }
	 }
	 return element;
 }
 /* END: Fun code */
