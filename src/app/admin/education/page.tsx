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
  orderBy,
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

interface EducationEntry {
  id?: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export default function AdminEducationPage() {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<EducationEntry | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'education'), orderBy('period', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const entries: EducationEntry[] = [];
        snapshot.forEach((doc) => {
          entries.push({ id: doc.id, ...doc.data() } as EducationEntry);
        });
        setEducationEntries(entries);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error fetching education data: ', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch education entries.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSave = async (entry: EducationEntry) => {
    setIsSaving(true);
    try {
      if (entry.id) {
        const docRef = doc(db, 'education', entry.id);
        await updateDoc(docRef, { ...entry });
        toast({ title: 'Success!', description: 'Entry updated successfully.' });
      } else {
        await addDoc(collection(db, 'education'), entry);
        toast({ title: 'Success!', description: 'Entry added successfully.' });
      }
      setIsDialogOpen(false);
      setCurrentEntry(null);
    } catch (error) {
      console.error('Error saving entry: ', error);
      toast({
        title: 'Error',
        description: 'Failed to save the entry.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteDoc(doc(db, 'education', id));
        toast({ title: 'Success!', description: 'Entry deleted successfully.' });
      } catch (error) {
        console.error('Error deleting entry: ', error);
        toast({
          title: 'Error',
          description: 'Failed to delete the entry.',
          variant: 'destructive',
        });
      }
    }
  };

  const openDialog = (entry: EducationEntry | null = null) => {
    setCurrentEntry(entry);
    setIsDialogOpen(true);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Education</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentEntry ? 'Edit' : 'Add'} Education Entry</DialogTitle>
            </DialogHeader>
            <EducationForm 
              entry={currentEntry} 
              onSave={handleSave} 
              isSaving={isSaving} 
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Education</CardTitle>
          <CardDescription>Update your educational background.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {educationEntries.map((entry) => (
                <Card key={entry.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{entry.degree}</h3>
                    <p className="text-sm text-muted-foreground">{entry.institution} | {entry.period}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openDialog(entry)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id!)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


function EducationForm({
  entry,
  onSave,
  isSaving,
  onClose,
}: {
  entry: EducationEntry | null;
  onSave: (data: EducationEntry) => void;
  isSaving: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<EducationEntry>({
    degree: '',
    institution: '',
    period: '',
    description: '',
  });

  useEffect(() => {
    if (entry) {
      setFormData(entry);
    } else {
      setFormData({
        degree: '',
        institution: '',
        period: '',
        description: '',
      });
    }
  }, [entry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <Label htmlFor="degree">Degree</Label>
        <Input id="degree" value={formData.degree} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="institution">Institution</Label>
        <Input id="institution" value={formData.institution} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="period">Period</Label>
        <Input id="period" value={formData.period} onChange={handleChange} placeholder="e.g., 2020 - 2022" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} />
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
