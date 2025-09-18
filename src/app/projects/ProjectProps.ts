import {LucideIcon} from 'lucide-react'

export interface projectProps {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  features: string[];
  deployment: string; 
  year: string;
  url: string;
  icon: LucideIcon;
}
