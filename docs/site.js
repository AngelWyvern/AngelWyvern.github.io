document.addEventListener('DOMContentLoaded', () =>
{
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
});

function popupDiscord()
{
	const blur = document.querySelector('#blur');
	
	if (blur)
	{
		blur.removeAttribute('disabled');
	
		const modal = document.createElement('div');
		modal.classList.add('content');
		modal.classList.add('discord-modal');
		modal.setAttribute('transition', 'pre');
	
		const top = document.createElement('div');
		top.classList.add('content');
		top.classList.add('discord-modal-top');
		modal.appendChild(top);
	
		const bottom = document.createElement('div');
		bottom.classList.add('content');
		bottom.classList.add('discord-modal-bottom');
		modal.appendChild(bottom);
	
		const avatar = document.createElement('div');
		avatar.classList.add('discord-avatar');
		top.appendChild(avatar);
	
		const name = document.createElement('div');
		name.classList.add('discord-usertag');
		name.innerHTML = `Angel Bot<span style="margin-left: 1px; color: #b9bbbe;">#6208</span>`;
		top.appendChild(name);

		const info = document.createElement('div');
		info.classList.add('discord-info');
		info.innerText = 'About Me';
		bottom.appendChild(info);

		const text = document.createElement('div');
		text.classList.add('discord-text');
		text.innerHTML = `<strong>SHORT</strong><br>Your average gamer.<br><br><strong>LONG</strong><br>Hey all, I am a freelance programmer who enjoys video games and hosts servers for people's enjoyment (<a href="https://vortexpolygonal.tf/">https://vortexpolygonal.tf/</a>).`;
		bottom.appendChild(text);
	
		blur.appendChild(modal);
		
		setTimeout(() => { if (modal) modal.setAttribute('transition', 'post'); }, 25);
		setTimeout(() => { if (modal) modal.removeAttribute('transition'); }, 150);
	}
}