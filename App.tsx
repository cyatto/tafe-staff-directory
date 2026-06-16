import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ScaledText as Text } from "./components/AppText";
import { SettingsProvider, useSettings } from "./components/SettingsContext";
import { SoundEffectsProvider, useSoundEffects } from "./components/SoundEffectsContext";
import { HomeTab } from "./components/HomeTab";
import { SearchTab } from "./components/SearchTab";
import { ActionsTab, ConfirmDialog } from "./components/ActionsTab";
import { SettingsTab } from "./components/SettingsTab";
import { ContactDetail } from "./components/ContactDetail";
import { ContactForm } from "./components/ContactForm";
import { Contact, INITIAL_CONTACTS } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "home" | "search" | "actions" | "settings";
type Screen = "tabs" | "detail" | "form";

const NAV_ITEMS: { id: Tab; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { id: "home",     icon: "people-outline",   label: "Directory" },
  { id: "search",   icon: "search-outline",   label: "Search"    },
  { id: "actions",  icon: "options-outline",  label: "Actions"   },
  { id: "settings", icon: "settings-outline", label: "Settings"  },
];

// ─── App ──────────────────────────────────────────────────────────────────────

// The actual app UI. Wrapped in <SettingsProvider> by the default export
// below, so it (and everything it renders) can read the text-size setting.
function AppContent() {
  // Data
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [nextId, setNextId] = useState(
    Math.max(...INITIAL_CONTACTS.map((c) => c.id)) + 1
  );

  // Navigation
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [screen, setScreen] = useState<Screen>("tabs");

  // Selection & form state
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null); // null = new contact

  // Confirm dialog
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);

  // Settings (now lives in SettingsContext, not local state)
  const { settings, setSettings, dimOpacity } = useSettings();
  const { playConfirm } = useSoundEffects();

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleSelectContact(contact: Contact) {
    setSelectedContact(contact);
    setScreen("detail");
  }

  function handleOpenForm(contact: Contact | null) {
    setEditingContact(contact);
    setScreen("form");
  }

  function handleSave(data: Omit<Contact, "id"> & { id?: number }) {
    if (data.id !== undefined) {
      // Edit existing
      setContacts((prev) =>
        prev.map((c) => (c.id === data.id ? { ...(data as Contact) } : c))
      );
      setSelectedContact(data as Contact);
    } else {
      // Add new
      const newContact: Contact = { ...data, id: nextId };
      setContacts((prev) => [...prev, newContact]);
      setNextId((n) => n + 1);
      setSelectedContact(newContact);
    }
    setScreen("detail");
  }

  function handleDeleteRequest(contact: Contact) {
    setPendingDelete(contact);
    setConfirmVisible(true);
    playConfirm();
  }

  function handleDeleteConfirm() {
    if (!pendingDelete) return;
    setContacts((prev) => prev.filter((c) => c.id !== pendingDelete.id));
    if (selectedContact?.id === pendingDelete.id) setSelectedContact(null);
    setPendingDelete(null);
    setConfirmVisible(false);
    setScreen("tabs");
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  function renderContent() {
    if (screen === "detail" && selectedContact) {
      return (
        <ContactDetail
          contact={selectedContact}
          onEdit={handleOpenForm}
          onDelete={handleDeleteRequest}
          onBack={() => setScreen("tabs")}
        />
      );
    }

    if (screen === "form") {
      return (
        <ContactForm
          contact={editingContact}
          onSave={handleSave}
          onCancel={() => setScreen(selectedContact ? "detail" : "tabs")}
        />
      );
    }

    // Tab screens
    switch (activeTab) {
      case "home":
        return <HomeTab contacts={contacts} onSelect={handleSelectContact} />;
      case "search":
        return <SearchTab contacts={contacts} onSelect={handleSelectContact} />;
      case "actions":
        return (
          <ActionsTab
            selectedContact={selectedContact}
            onAdd={() => handleOpenForm(null)}
            onEdit={handleOpenForm}
            onDelete={handleDeleteRequest}
            onViewContact={handleSelectContact}
          />
        );
      case "settings":
        return <SettingsTab settings={settings} onChange={setSettings} />;
    }
  }

  const showTabBar = screen === "tabs";

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#931c21" />

      {/* Main content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Bottom tab bar — hidden when on detail/form screens */}
      {showTabBar && (
        <View style={styles.tabBar}>
          {NAV_ITEMS.map(({ id, icon, label }) => {
            const active = activeTab === id;
            return (
              <TouchableOpacity
                key={id}
                style={styles.tabItem}
                onPress={() => setActiveTab(id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={active ? (icon.replace("-outline", "") as keyof typeof Ionicons.glyphMap) : icon}
                  size={22}
                  color={active ? "#931c21" : "#d4a0aa"}
                />
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* Delete confirmation modal */}
      <ConfirmDialog
        visible={confirmVisible}
        title="Delete Contact"
        message={`Are you sure you want to remove ${pendingDelete?.name ?? "this contact"} from the directory? This cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setConfirmVisible(false);
          setPendingDelete(null);
        }}
      />

      {/* Brightness dim overlay — sits on top of everything, ignores touches */}
      <View pointerEvents="none" style={[styles.dimOverlay, { opacity: dimOpacity }]} />
    </SafeAreaView>
  );
}

// This is what actually gets rendered by Expo. The Provider sits above
// AppContent so every screen/component underneath can call useSettings().
export default function App() {
  return (
    <SettingsProvider>
      <SoundEffectsProvider>
        <AppContent />
      </SoundEffectsProvider>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#931c21" }, // status bar bg blends with header
  dimOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
  },
  content: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "rgba(147,28,33,0.1)",
    paddingBottom: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#d4a0aa",
    letterSpacing: 0.3,
  },
  tabLabelActive: { color: "#931c21" },
});