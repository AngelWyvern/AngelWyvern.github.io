setTimeout(() => { document.querySelector('#social-medias').removeAttribute('pretransition'); }, 2250);
setTimeout(() => { document.querySelector('#quote-container').removeAttribute('pretransition'); }, 3000);

document.addEventListener('DOMContentLoaded', () =>
{
	fetchQuote();
	
	document.querySelectorAll('.social-media').forEach(sm =>
	{
		if (sm.href.startsWith('javascript:'))
			return;

		sm.addEventListener('click', e =>
		{
			if (e.button == 0)
			{
				e.preventDefault();
				goto(sm);
			}
		});
	});
}, { once:true });

async function fetchQuote()
{
	const qt = document.querySelector('#typed-quote');

	const quoteList = (await (await fetch('./quotes.txt')).text()).split('\n');
	while (quoteList.includes(''))
		quoteList.splice(quoteList.indexOf(''), 1);
	//console.dir(quoteList);

	const selected = quoteList[Math.round(Math.random() * (quoteList.length - 1))];
	qt.setAttribute('text', selected);
}

function goto(targetElem)
{
	// This took days to get looking good.
	const blur = document.querySelector('#blur');

	const r = GetFixedBoundingRect(targetElem);

	let mockElem = InitializeElement('div', { className:`${targetElem.className} mock`, id:targetElem.id, style:`inset:${r.t}px ${r.r}px ${r.b}px ${r.l}px;width:unset;height:unset;transition:left 550ms var(--trans-flood), right 550ms var(--trans-flood), top 625ms var(--trans-flood), bottom 625ms var(--trans-flood), border-radius 275ms var(--trans-flood), filter 600ms var(--trans-flood);` });

	let mockContainer = InitializeElement('div', { className:`${targetElem.className} mock`, id:targetElem.id, style:`top:${r.t}px;left:${r.l}px;background:none;box-shadow:none;width:max-content;height:max-content;transition:inset 325ms var(--trans-flood),transform 325ms var(--trans-flood);` });
	while (targetElem.childNodes.length > 0)
		mockContainer.appendChild(targetElem.childNodes[0]);

	let loaderElem = InitializeElement('div', { className:`loader mock`, style:`top:${r.t+64}px;left:${r.l+r.orig.width/2-80}px;opacity:0;transition:opacity 650ms var(--trans-flood),inset 325ms var(--trans-flood),transform 325ms var(--trans-flood);` });

	//let fadeElem = InitializeElement('div', { className:'mock', style:`inset:0;background:var(--background);transition:opacity 600ms var(--trans-flood);opacity:0;` });

	blur.append(mockElem, mockContainer, loaderElem/*, fadeElem*/);
	blur.setAttribute('persist', '');
	blur.removeAttribute('disabled');
	targetElem.style.opacity = '0';

	requestAnimationFrames(() =>
	{
		mockElem.style.inset = '0';
		mockElem.style.borderRadius = '5%';
		mockElem.style.filter = 'brightness(0.25)';

		//mockContainer.style.opacity = '0';
		//mockContainer.style.transform = `scale(3)`;
		mockContainer.style.top = '50%';
		mockContainer.style.left = '50%';
		mockContainer.style.transform = `scale(1.75) translate(${-50/1.75}%, ${-50/1.75}%)`;

		loaderElem.style.top = '55%';
		loaderElem.style.left = '50%';
		loaderElem.style.transform = 'translate(-50%, 100%)';
		loaderElem.style.opacity = '1';

		/*setTimeout(() => {*/ /*fadeElem.style.opacity = '0.875';*/ /*fadeElem.style.backdropFilter = 'blur(8px)'; }, 200);*/
		setTimeout(() => { mockElem.style.borderRadius = '0'; }, 275);
		setTimeout(() => location.href = targetElem.href, 325);
	}, 2);

	shouldRefresh = true; // Don't want to come back to an unusable page now...
}