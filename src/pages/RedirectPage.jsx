import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { motion } from 'framer-motion';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const RedirectPage = () => {
  const { userId, adId } = useParams();
  const navigate = useNavigate();
  const [ads, setAds] = useLocalStorage('ads', []);
  const [userStats, setUserStats] = useLocalStorage('userAdStats', {});
  const [status, setStatus] = useState('loading'); 
  const [targetUrl, setTargetUrl] = useState('');
  const [adDetails, setAdDetails] = useState(null);

  useEffect(() => {
    const ad = ads.find(a => a.id === adId);
    setAdDetails(ad);

    if (ad) {
      setTargetUrl(ad.targetUrl);
      
      setUserStats(prevStats => {
        const statKey = `${userId}_${adId}`;
        const currentStat = prevStats[statKey] || { clicks: 0, views: 0 };
        return {
          ...prevStats,
          [statKey]: {
            clicks: Number(currentStat.clicks || 0) + 1,
            views: Number(currentStat.views || 0) + 1, 
          }
        };
      });

      setAds(prevAds => prevAds.map(a => 
        a.id === adId 
        ? { 
            ...a, 
            clicks: Number(a.clicks || 0) + 1,
            views: Number(a.views || 0) + 1, 
          } 
        : a
      ));
      
      setStatus('success');
      
      document.title = ad.title || 'AdShare Redirect';
      
      const setMetaTag = (nameOrProperty, value, isProperty = true) => {
        let element = document.querySelector(isProperty ? `meta[property='${nameOrProperty}']` : `meta[name='${nameOrProperty}']`);
        if (!element) {
          element = document.createElement('meta');
          if (isProperty) {
            element.setAttribute('property', nameOrProperty);
          } else {
            element.setAttribute('name', nameOrProperty);
          }
          document.head.appendChild(element);
        }
        element.setAttribute('content', value || '');
      };

      setMetaTag('og:title', ad.title);
      setMetaTag('og:description', ad.description);
      setMetaTag('og:image', ad.imageUrl || `${window.location.origin}/default-ad-image.png`); 
      setMetaTag('og:url', window.location.href);
      setMetaTag('og:type', 'website');
      setMetaTag('twitter:card', 'summary_large_image', false);
      setMetaTag('twitter:title', ad.title, false);
      setMetaTag('twitter:description', ad.description, false);
      setMetaTag('twitter:image', ad.imageUrl || `${window.location.origin}/default-ad-image.png`, false);


      setTimeout(() => {
        if (ad.targetUrl) {
          window.location.href = ad.targetUrl;
        } else {
          setStatus('error'); 
        }
      }, 2500); 

    } else {
      setStatus('notfound');
      document.title = 'Ad Not Found - AdShare';
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adId, userId]); 

  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-purple-400 mb-4" />
            <p className="text-xl text-gray-300">Processing your link...</p>
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
            <p className="text-xl text-gray-300">Redirecting you to "{adDetails?.title || 'the ad'}"!</p>
            <p className="text-sm text-gray-400">Your interaction has been recorded. Thank you!</p>
            {adDetails?.imageUrl && (
              <div className="mt-4 w-full max-w-xs mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
                <img src={adDetails.imageUrl} alt={adDetails.title || 'Ad Preview'} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">If you are not redirected, <a href={targetUrl} className="text-purple-400 hover:underline">click here</a>.</p>
          </>
        );
      case 'notfound':
        return (
          <>
            <AlertTriangle className="h-16 w-16 text-yellow-400 mb-4" />
            <p className="text-xl text-gray-300">Ad Not Found</p>
            <p className="text-sm text-gray-400">The ad you are looking for does not exist or may have been removed.</p>
          </>
        );
      case 'error':
      default:
        return (
          <>
            <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
            <p className="text-xl text-gray-300">An Error Occurred</p>
            <p className="text-sm text-gray-400">We couldn't process your request or the ad link is invalid. Please try again later.</p>
          </>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center text-white p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center p-10 rounded-xl glassmorphism shadow-2xl max-w-md w-full"
      >
        {renderStatus()}
      </motion.div>
    </div>
  );
};

export default RedirectPage;