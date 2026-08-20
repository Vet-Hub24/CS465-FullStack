const travel = async (req, res) => {
  const apiBaseUrl = process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}/api`;

  try {
    const response = await fetch(`${apiBaseUrl}/trips`, {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Trip API returned HTTP ${response.status}`);
    }

    const trips = await response.json();

    return res.render('travel', {
      title: 'Travel Packages',
      trips: Array.isArray(trips) ? trips : [],
      message: Array.isArray(trips) && trips.length === 0 ? 'No trips are currently available.' : ''
    });
  } catch (err) {
    console.error('Travel page API error:', err);
    return res.status(502).render('travel', {
      title: 'Travel Packages',
      trips: [],
      message: 'Trip information is temporarily unavailable.'
    });
  }
};

module.exports = { travel };
