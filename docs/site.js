const root = document.querySelector(':root');
var shouldRefresh = false;

document.addEventListener('DOMContentLoaded', () =>
{
	/* START: Cookie loading */
	const themeCookie = getCookie('theme');
	if (themeCookie)
		root.setAttribute('theme', themeCookie);
	/* END: Cookie loading */

	document.querySelector('#copyright').innerText = `Copyright © 2022-${new Date().getUTCFullYear()} angelwyvern.github.io - All Rights Reserved.`;

	const blur = document.querySelector('#blur');
	blur.addEventListener('click', (e) =>
	{
		if (e.target == blur && !blur.hasAttribute('disabled') && !blur.hasAttribute('persist'))
		{
			blur.setAttribute('disabled', '');
			blur.removeAttribute('dark');

			const modal = document.querySelector('.discord-modal');
			if (modal)
			{
				modal.style.transform = 'scale(0)';
				setTimeout(() => { if (modal) modal.remove(); }, 100);
			}
		}
	});

	document.querySelectorAll('.typed').forEach((e) =>
	{
		const ms = parseInt(e.getAttribute('ms'));
		const delay = parseInt(e.getAttribute('delay'));

		const deviation = 24; //ms * 0.24;
		let rnd = Math.random() * deviation - deviation / 2;
		
		setTimeout(() =>
		{
			let text = '';
			const finalText = e.getAttribute('text');

			function tm()
			{
				text += finalText[text.length];
				e.innerText = text;
				if (text.length < finalText.length)
				{
					rnd = Math.random() * 25 - 12.5;
					switch (finalText[text.length - 1])
					{
						case ',':
						case ':':
						case ';':
							rnd += Math.random() * 25 + 125;
							break;
						case '.':
						case '!':
						case '?':
							rnd += Math.random() * 50 + 300;
							break;
					}
					setTimeout(tm, ms + rnd);
				}
			}
			tm();
		}, delay);
	});
	
	requestAnimationFrames(() => document.body.removeAttribute('loading'), 2); // getting the second animation frame after fully loaded
}, { once:true });

window.addEventListener('pageshow', e =>
{
	// thanks https://stackoverflow.com/a/43043658
	var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
	if (historyTraversal && shouldRefresh)
		window.location.reload();
});

function popupDiscord()
{
	const blur = document.querySelector('#blur');
	if (blur)
	{
		blur.removeAttribute('disabled');
		blur.setAttribute('dark', '');

		const modal = InitializeElement('iframe', { className:'discord-modal', attributes:{ width:608, height:700, src:'/modals/discord-profile.html' }, style:'transform: scale(0)' });
		blur.appendChild(modal);

		requestAnimationFrames(() =>
		{
			if (modal)
				modal.style.transform = 'scale(1)';
		}, 2); // sometimes, 1 animation frame isn't enough for the transition to play, so we wait 2 frames just in case
	}
}

function toggleTheme()
{
	let theme = root.getAttribute('theme');

	if (theme == 'dark') theme = 'lite';
	else theme = 'dark';

	root.setAttribute('theme', theme)
	setCookie('theme', theme);
}

// Thanks Grepper for these two functions
function setCookie(name, value, days)
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
 * @param {Object} [options.attributes] OPTIONAL: Element Attributes
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
			else if (key == 'attributes') for (const attrKey in options.attributes) element.setAttribute(attrKey, options.attributes[attrKey]);
			else if (key == 'innerHTML')  element.innerHTML = options.innerHTML;
			else if (key == 'innerText')  element.innerText = options.innerText;
			else if (key == 'href')       element.href = options.href;
		}
	}
	return element;
}

/**
 * Gets the bounding rectangle of an element for fixed positioning (only supports pixel units)
 * 
 * @param {HTMLElement} element REQUIRED: Target element to perform computations on
 * 
 * @return The computed bounding rectangle of the given element
 */
function GetFixedBoundingRect(element)
{
	const br = element.getBoundingClientRect();
	const cmp = getComputedStyle(element);

	const dr = document.body.getBoundingClientRect();

	const t = br.top;
	const r = dr.width - (br.left + br.width);
	const b = dr.height - (br.top + br.height);
	const l = br.left;
	const w = parseInt(cmp.width) | 0;
	const h = parseInt(cmp.height) | 0;

	return { t:t, r:r, b:b, l:l, w:w, h:h, orig:br };
}
/* END: Fun code */