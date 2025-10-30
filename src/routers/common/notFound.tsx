import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSearch, Home, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col gap-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <FileSearch className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          <CardDescription className="text-lg">The page you're looking for doesn't exist or has been moved.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
          <p className="text-muted-foreground mb-6">Don't worry, it happens to the best of us. Let's get you back on track.</p>
          <div className="flex flex-col flex flex-col gap-3">
            <Button onClick={() => navigate('/')} className="w-full">
              <Home className="h-4 w-4 me-2" />
              Go Home
            </Button>
            <Button variant="outline" onClick={handleGoBack} className="w-full">
              <RotateCcw className="h-4 w-4 me-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
