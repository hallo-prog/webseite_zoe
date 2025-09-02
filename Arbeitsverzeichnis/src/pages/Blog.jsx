import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowRight } from 'lucide-react';
import { API_BASE } from '../utils/api';
import { Heading } from '@/components/ui/heading';
import { Section } from '@/components/ui/section';
import { useTranslation } from 'react-i18next';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/posts`);
                if (!response.ok) {
                    throw new Error('Fehler beim Laden der Beiträge.');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Section size="wide" padding="normal">
            <Helmet>
                <title>Solar-Ratgeber - ZOE Solar</title>
                <meta name="description" content="Aktuelle Nachrichten, Tipps und rechtliche Informationen aus der Welt der Solarenergie. Bleiben Sie mit ZOE Solar auf dem Laufenden." />
            </Helmet>

            <div className="text-center flow-lg mb-12">
                <Heading as="h1" size="3xl">{t('blog.title')}</Heading>
                <p className="lead max-w-2xl mx-auto text-gray-500">{t('blog.subtitle')}</p>
            </div>

            {loading && <p className="text-center">Lade Beiträge...</p>}
            {error && <p className="text-center text-red-500">Fehler: {error} Bitte stellen Sie sicher, dass der Backend-Server läuft.</p>}
            
            {!loading && !error && posts.length === 0 && (
                <div className="text-center bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-700">Noch keine Beiträge vorhanden</h3>
                    <p className="mt-2 text-gray-500">Der automatische Prozess zur Beitragserstellung läuft täglich. Schauen Sie bald wieder vorbei!</p>
                    <p className="mt-4 text-sm text-gray-400">(Entwicklung: API via HTTPS-Proxy bereitzustellen empfohlen – setzen Sie ggf. VITE_API_BASE_URL. Vermeiden Sie Mixed Content durch unverschlüsselte http:// Aufrufe.)</p>
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Link to={`/blog/${post.slug}`} key={post.slug} className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{new Date(post.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <Heading as="h2" size="xl" className="mb-2 group-hover:text-blue-600 transition-colors duration-300">{post.title}</Heading>
                            <div className="mt-4 flex items-center font-semibold text-blue-600">
                                Weiterlesen
                                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
    </Section>
    );
};

export default Blog;
