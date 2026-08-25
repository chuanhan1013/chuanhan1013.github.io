(() => {
  const hero = document.querySelector('#about.hero');
  if (!hero) return;

  const kicker = hero.querySelector('.kicker');
  if (kicker) kicker.textContent = 'BUILDING RELIABLE INTELLIGENT ROBOTS';

  const headline = hero.querySelector('h2');
  if (headline) headline.textContent = 'I build robotic systems across perception, planning, and reliable autonomy.';

  const primary = hero.querySelector('.hero-lede');
  if (primary) {
    primary.textContent = 'My current research focuses on deep reinforcement learning for robot manipulator motion planning in dynamic environments.';

    let secondary = hero.querySelector('.hero-lede-secondary');
    if (!secondary) {
      secondary = document.createElement('p');
      secondary.className = 'hero-lede hero-lede-secondary';
      primary.after(secondary);
    }
    secondary.textContent = 'With a background spanning biomechatronics, multimodal perception, robot learning, and AI/software engineering, I am interested in embodied AI systems that can perceive, reason, and act reliably in the physical world.';
    secondary.style.marginTop = '10px';

    let openTo = hero.querySelector('.hero-open-to');
    if (!openTo) {
      openTo = document.createElement('p');
      openTo.className = 'hero-open-to';
      secondary.after(openTo);
    }
    openTo.textContent = 'Open to robotics, embodied AI, AI systems, and research engineering opportunities in Singapore.';
  }

  const interests = hero.querySelector('.interest-strip');
  if (interests) {
    const labels = [
      'Deep Reinforcement Learning',
      'Motion Planning',
      'Embodied AI',
      'Multimodal Perception',
      'Reliable Autonomy'
    ];
    interests.replaceChildren(...labels.map(label => {
      const tag = document.createElement('span');
      tag.textContent = label;
      return tag;
    }));
  }

  const style = document.createElement('style');
  style.textContent = '.hero-open-to{margin:16px 0 0;color:#35536e;font-size:12px;font-weight:720;letter-spacing:.01em}';
  document.head.append(style);
})();
