import { useEffect, useState } from "react";
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
  Mail,
  Github,
  Linkedin,
  Twitter,
  Moon,
  Sun,
  Terminal,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const handleNavigate = (href) => {
    onOpenChange(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("http")) {
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

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleNavigate("/")} data-testid="cmd-home">
            <Home className="mr-2 h-4 w-4" />
            Home
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/projects")} data-testid="cmd-projects">
            <FolderGit2 className="mr-2 h-4 w-4" />
            Projects
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/case-studies")} data-testid="cmd-case-studies">
            <BookOpen className="mr-2 h-4 w-4" />
            Case Studies
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/blog")} data-testid="cmd-blog">
            <FileText className="mr-2 h-4 w-4" />
            Blog
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/contact")} data-testid="cmd-contact">
            <Terminal className="mr-2 h-4 w-4" />
            Contact
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/status")} data-testid="cmd-status">
            <Cpu className="mr-2 h-4 w-4" />
            Status
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Sections">
          <CommandItem onSelect={() => handleNavigate("#hero")}>
            <Terminal className="mr-2 h-4 w-4" />
            Overview
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("#archive")}>
            <FolderGit2 className="mr-2 h-4 w-4" />
            Projects Archive
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("#casestudy")}>
            <BookOpen className="mr-2 h-4 w-4" />
            Deep Dives
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("#testimonials")}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Testimonials
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("#terminal")}>
            <Mail className="mr-2 h-4 w-4" />
            Contact Terminal
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
