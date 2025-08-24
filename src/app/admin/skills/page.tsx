'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
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
import { Loader2, PlusCircle, Trash, Edit, Code, Server, Database, Palette } from 'lucide-react';

const icons = {
    Code: <Code className="w-8 h-8 text-primary" />,
    Server: <Server className="w-8 h-8 text-primary" />,
    Database: <Database className="w-8 h-8 text-primary" />,
    Palette: <Palette className="w-8 h-8 text-primary" />,
}

type IconName = keyof typeof icons;

interface Skill {
  id?: string;
  icon: IconName;
  title: string;
  description: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'skills'),
      (snapshot) => {
        const skillsData: Skill[] = [];
        snapshot.forEach((doc) => {
          skillsData.push({ id: doc.id, ...doc.data() } as Skill);
        });
        setSkills(skillsData);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching skills: ', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch skills.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSave = async (skill: Omit<Skill, 'id'>) => {
    setIsSaving(true);
    try {
      if (currentSkill?.id) {
        const docRef = doc(db, 'skills', currentSkill.id);
        await updateDoc(docRef, skill);
        toast({ title: 'Success!', description: 'Skill updated successfully.' });
      } else {
        await addDoc(collection(db, 'skills'), skill);
        toast({ title: 'Success!', description: 'Skill added successfully.' });
      }
      setIsDialogOpen(false);
      setCurrentSkill(null);
    } catch (error) {
      console.error('Error saving skill: ', error);
      toast({
        title: 'Error',
        description: 'Failed to save the skill.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteDoc(doc(db, 'skills', id));
        toast({ title: 'Success!', description: 'Skill deleted successfully.' });
      } catch (error) {
        console.error('Error deleting skill: ', error);
        toast({
          title: 'Error',
          description: 'Failed to delete the skill.',
          variant: 'destructive',
        });
      }
    }
  };
  
  const openDialog = (skill: Skill | null = null) => {
    setCurrentSkill(skill);
    setIsDialogOpen(true);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Skills</h1>
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentSkill ? 'Edit' : 'Add'} Skill</DialogTitle>
            </DialogHeader>
            <SkillForm
                skill={currentSkill}
                onSave={handleSave}
                isSaving={isSaving}
                onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>
            Update your skills and their descriptions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                    <Card key={skill.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            {icons[skill.icon]}
                            <CardTitle>{skill.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{skill.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                             <Button variant="ghost" size="icon" onClick={() => openDialog(skill)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id!)}>
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


function SkillForm({
  skill,
  onSave,
  isSaving,
  onClose,
}: {
  skill: Skill | null;
  onSave: (data: Omit<Skill, 'id'>) => void;
  isSaving: boolean;
  onClose: () => void;
}) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Code' as IconName,
    });

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    } else {
      setFormData({
        title: '',
        description: '',
        icon: 'Code' as IconName,
      });
    }
  }, [skill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} required />
      </div>
       <div className="space-y-2">
        <Label htmlFor="icon">Icon</Label>
        <select id="icon" value={formData.icon} onChange={handleChange} className="w-full p-2 border rounded-md bg-background">
            {Object.keys(icons).map(iconName => (
                <option key={iconName} value={iconName}>{iconName}</option>
            ))}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
