import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { PlusCircle, Image as ImageIcon, Link as LinkIcon, FileText, Tag, Trash2, Eye } from 'lucide-react';

const AdminPage = () => {
  const [ads, setAds] = useLocalStorage('ads', []);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !targetUrl) {
      toast({
        title: 'Error Creating Ad',
        description: 'Please fill in all required fields (Title, Description, Target URL).',
        variant: 'destructive',
      });
      return;
    }

    const newAd = {
      id: uuidv4(),
      title,
      description,
      targetUrl,
      imageUrl,
      createdAt: new Date().toISOString(),
      clicks: 0, 
      views: 0, 
    };
    setAds(prevAds => [newAd, ...prevAds]);
    toast({
      title: 'Ad Created!',
      description: `"${title}" has been successfully published.`,
      className: 'bg-green-500 text-white'
    });
    setTitle('');
    setDescription('');
    setTargetUrl('');
    setImageUrl('');
  };

  const handleDeleteAd = (adId) => {
    setAds(prevAds => prevAds.filter(ad => ad.id !== adId));
    toast({
      title: 'Ad Deleted',
      description: 'The ad has been removed.',
      variant: 'destructive'
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-purple-900 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto space-y-8"
      >
        <Card className="max-w-2xl mx-auto shadow-2xl glassmorphism border-primary/30 dark:border-primary/50 dark:bg-gray-800/70">
          <CardHeader className="text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Create New Ad</CardTitle>
            </motion.div>
            <CardDescription className="text-muted-foreground dark:text-gray-400">Fill in the details below to publish a new advertisement.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center text-lg font-semibold text-foreground dark:text-gray-200">
                  <Tag className="mr-2 h-5 w-5 text-primary" /> Ad Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Amazing New Product Launch!"
                  className="bg-background/80 dark:bg-gray-700/50 border-primary/50 focus:border-primary dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center text-lg font-semibold text-foreground dark:text-gray-200">
                  <FileText className="mr-2 h-5 w-5 text-primary" /> Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your ad. Keep it catchy!"
                  className="bg-background/80 dark:bg-gray-700/50 border-primary/50 focus:border-primary dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetUrl" className="flex items-center text-lg font-semibold text-foreground dark:text-gray-200">
                  <LinkIcon className="mr-2 h-5 w-5 text-primary" /> Target URL
                </Label>
                <Input
                  id="targetUrl"
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://your-website.com or whatsapp://send?phone=..."
                  className="bg-background/80 dark:bg-gray-700/50 border-primary/50 focus:border-primary dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="flex items-center text-lg font-semibold text-foreground dark:text-gray-200">
                  <ImageIcon className="mr-2 h-5 w-5 text-primary" /> Image URL (Optional)
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://image-url.com/your-ad-image.png"
                  className="bg-background/80 dark:bg-gray-700/50 border-primary/50 focus:border-primary dark:text-white"
                />
                 <p className="text-xs text-muted-foreground dark:text-gray-400">Tip: Use <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Unsplash</a> for free images. Ensure direct image links (e.g., ending in .jpg, .png).</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground text-lg py-3">
                  <PlusCircle className="mr-2 h-5 w-5" /> Publish Ad
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-foreground dark:text-gray-100">Published Ads ({ads.length})</h2>
          {ads.length === 0 ? (
            <p className="text-center text-muted-foreground dark:text-gray-400">No ads published yet. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 glassmorphism dark:bg-gray-800/80 dark:border-primary/40">
                    {ad.imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden">
                         <img src={ad.imageUrl} alt={ad.title || 'Ad image'} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="truncate text-xl text-primary dark:text-purple-400">{ad.title}</CardTitle>
                      <CardDescription className="h-10 overflow-hidden text-ellipsis text-muted-foreground dark:text-gray-300">{ad.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        <LinkIcon className="inline mr-1 h-4 w-4" /> 
                        Target: <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline dark:text-purple-400">{ad.targetUrl.substring(0,30)}...</a>
                      </p>
                       <p className="text-sm text-muted-foreground dark:text-gray-400">
                        <Eye className="inline mr-1 h-4 w-4" /> Views: {ad.views || 0}
                      </p>
                       <p className="text-sm text-muted-foreground dark:text-gray-400">
                        <PlusCircle className="inline mr-1 h-4 w-4" /> Clicks: {ad.clicks || 0}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteAd(ad.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminPage;