'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash, Edit } from 'lucide-react';
import type { Project } from '@/lib/types';
import Image from 'next/image';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'projects'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projs: Project[] = [];
        snapshot.forEach((doc) => {
          projs.push({ id: doc.id, ...(doc.data() as Omit<Project, 'id'>) });
        });
        setProjects(projs);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching projects: ', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch projects.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSave = async (project: Omit<Project, 'id'>) => {
    setIsSaving(true);
    const slug = project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const projectData = {...project, slug, link: `/projects/${slug}`};
    
    try {
      if (currentProject?.id) {
        const docRef = doc(db, 'projects', currentProject.id);
        await updateDoc(docRef, projectData);
        toast({ title: 'Success!', description: 'Project updated successfully.' });
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        toast({ title: 'Success!', description: 'Project added successfully.' });
      }
      setIsDialogOpen(false);
      setCurrentProject(null);
    } catch (error) {
      console.error('Error saving project: ', error);
      toast({
        title: 'Error',
        description: 'Failed to save the project.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        toast({ title: 'Success!', description: 'Project deleted successfully.' });
      } catch (error) {
        console.error('Error deleting project: ', error);
        toast({
          title: 'Error',
          description: 'Failed to delete the project.',
          variant: 'destructive',
        });
      }
    }
  };
  
  const openDialog = (project: Project | null = null) => {
    setCurrentProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{currentProject ? 'Edit' : 'Add'} Project</DialogTitle>
            </DialogHeader>
            <ProjectForm 
              project={currentProject} 
              onSave={handleSave} 
              isSaving={isSaving} 
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>
            Here you can add, edit, or delete your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle className="truncate">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="relative h-40 w-full">
                        <Image src={project.image} alt={project.title} fill className="object-cover rounded-md"/>
                     </div>
                     <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                     <Button variant="ghost" size="icon" onClick={() => openDialog(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id!)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectForm({
  project,
  onSave,
  isSaving,
  onClose,
}: {
  project: Project | null;
  onSave: (data: Omit<Project, 'id'|'slug'|'link'>) => void;
  isSaving: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    image: '',
    imageHint: '',
    githubLink: '',
    tags: '',
    category: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        image: project.image,
        imageHint: project.imageHint,
        githubLink: project.githubLink,
        tags: project.tags.join(', '),
        category: project.category,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        longDescription: '',
        image: '',
        imageHint: '',
        githubLink: '',
        tags: '',
        category: '',
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={formData.title} onChange={handleChange} required />
      </div>
       <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="longDescription">Long Description</Label>
        <Textarea id="longDescription" value={formData.longDescription} onChange={handleChange} rows={5} required />
      </div>
       <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" value={formData.image} onChange={handleChange} placeholder="https://placehold.co/1200x600.png" required />
      </div>
       <div className="space-y-2">
        <Label htmlFor="imageHint">Image Hint</Label>
        <Input id="imageHint" value={formData.imageHint} onChange={handleChange} placeholder="e.g. abstract nature" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="githubLink">GitHub Link</Label>
        <Input id="githubLink" value={formData.githubLink} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" value={formData.category} onChange={handleChange} placeholder="e.g., Web, Mobile" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input id="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. React, Next.js, AI" required />
      </div>
      <div className="flex justify-end gap-2 sticky bottom-0 bg-background py-4">
        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
