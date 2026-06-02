import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  FolderGit2,
  FileText,
  Cpu,
  Github,
  Linkedin,
  Moon,
  Sun,
  Terminal,
  BookOpen,
  MessageSquare,
  Briefcase,
  Wrench,
  User,
} from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const handleNavigate = (href) => {
    onOpenChange(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      navigate(href);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Development">
          <CommandItem onSelect={() => handleNavigate("/")} data-testid="cmd-home">
            <Home className="mr-2 h-4 w-4" />
            Full-Stack Overview
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/about")} data-testid="cmd-about">
            <User className="mr-2 h-4 w-4" />
            About Profile
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/services")} data-testid="cmd-services">
            <Wrench className="mr-2 h-4 w-4" />
            Engineering Services
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/projects")} data-testid="cmd-projects">
            <FolderGit2 className="mr-2 h-4 w-4" />
            Solutions Archive
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/case-studies")} data-testid="cmd-case-studies">
            <BookOpen className="mr-2 h-4 w-4" />
            System Architecture
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/about#experience")} data-testid="cmd-experience">
            <Briefcase className="mr-2 h-4 w-4" />
            Professional Experience
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/blog")} data-testid="cmd-blog">
            <FileText className="mr-2 h-4 w-4" />
            Dev Journal
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/about#resume")} data-testid="cmd-resume">
            <FileText className="mr-2 h-4 w-4" />
            Core Manifest (Resume)
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/contact")} data-testid="cmd-contact">
            <Terminal className="mr-2 h-4 w-4" />
            Initiate Terminal
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="System Sections">
          <CommandItem onSelect={() => handleNavigate("/#hero")}>
            <Terminal className="mr-2 h-4 w-4" />
            Architecture Overview
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/projects#archive")}>
            <FolderGit2 className="mr-2 h-4 w-4" />
            Solutions Repository
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/#analytics")}>
            <Cpu className="mr-2 h-4 w-4" />
            Performance Metrics
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/#testimonials")}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Peer Reviews
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="External">
          <CommandItem onSelect={() => handleNavigate("https://github.com")} data-testid="cmd-github">
            <Github className="mr-2 h-4 w-4" />
            GitHub Profile
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("https://linkedin.com")} data-testid="cmd-linkedin">
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Preferences">
          <CommandItem
            onSelect={() => { toggle(); onOpenChange(false); }}
            data-testid="cmd-toggle-theme"
          >
            {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
