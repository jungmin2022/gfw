import forestWatcherIcon from 'assets/icons/forest-watcher.svg';
import proIcon from 'assets/icons/gfw-pro.svg';

import conservationOrgs from './assets/conservation-orgs.jpg';
import policyMakers from './assets/policy-makers.jpg';
import journalists from './assets/journalists.jpg';
import company from './assets/company.jpg';

import forestWatcherImage from './assets/forestwatcher@2x.jpg';
import proImage from './assets/pro-bg@2x.png';

export default {
  uses: [
    {
      profile: 'Conservation Orgs',
      example:
        "The Amazon Conservation Association (ACA) works to protect biodiversity in the Amazon. With GLAD deforestation alerts on Global Forest Watch, we can detect illegal gold mining and logging in protected areas within days. By getting timely and precise information into the hands of policymakers, we've seen government authorities on the ground taking action within 24-48 hours of receiving an alert.",
      credit: {
        name: 'MINAMPERÚ',
        extLink: 'https://www.flickr.com/photos/minamperu/9966829933',
      },
      img: conservationOrgs,
    },
    {
      profile: 'Policymaker',
      example:
        'At the Forest Development Authority in Liberia, we saw a need to improve science-based decision making in forest resource management. We developed a Forest Atlas with Global Forest Watch that allows us to manage and share information about forest cover and land use. The Forest Atlas revolutionized how we communicate about the forest sector in Liberia.',
      credit: {
        name: 'Greenpeace International',
        extLink: 'http://www.greenpeace.org/',
      },
      img: policyMakers,
    },
    {
      profile: 'Journalist',
      example:
        "Mongabay is a science-based environmental news platform aiming to inspire, educate, and inform the public. The deforestation and fire alerts on GFW allow us to identify stories as they're happening on the ground. In Peru, we were able to track fires as they invaded protected areas and mobilize our Latin America team to get coverage. It added a really timely dimension to our reporting and led Peruvian officials to go out immediately and address the situation.",
      credit: {
        name: 'CIFOR',
        extLink: 'https://www.flickr.com/photos/cifor/16425898585',
      },
      img: journalists,
    },
    {
      profile: 'Company',
      example:
        'At Mars, deforestation poses a risk to our business – we don’t want our supply chains to be associated with serious environmental issues. We used the PALM risk tool on GFW Commodities to evaluate our palm oil suppliers and help us make decisions about where to source from. With GFW, we were able to turn concerns about deforestation into an actionable method for engaging our suppliers.',
      credit: {
        name: 'Marufish',
        extLink: 'https://www.flickr.com/photos/marufish/4074823996',
      },
      img: company,
    },
  ],
  apps: [
    {
      title: 'Forest Watcher',
      description:
        "Access GFW's forest monitoring and alert system offline and collect data from the field, all from your mobile device",
      background: forestWatcherImage,
      extLink: 'https://forestwatcher.globalforestwatch.org/',
      color: '#97be32',
      icon: forestWatcherIcon,
    },
    {
      title: 'GFW Pro',
      description:
        'Securely manage deforestation risk in commodity supply chains',
      background: proImage,
      extLink: 'https://pro.globalforestwatch.org',
      color: '#404042',
      icon: proIcon,
      className: 'pro',
    },
  ],
};
