import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Contact, getAvatarStyle, getInitials, getDepartmentName } from "../types";

interface Props {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}

// Group contacts alphabetically
function groupByLetter(contacts: Contact[]): { letter: string; data: Contact[] }[] {
  const sorted = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  const groups: Record<string, Contact[]> = {};
  for (const c of sorted) {
    const letter = c.name[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(c);
  }
  return Object.keys(groups)
    .sort()
    .map((letter) => ({ letter, data: groups[letter] }));
}

function ContactRow({ contact, onSelect }: { contact: Contact; onSelect: (c: Contact) => void }) {
  const avatar = getAvatarStyle(contact.name);
  return (
    <TouchableOpacity style={styles.row} onPress={() => onSelect(contact)} activeOpacity={0.75}>
      <View style={[styles.avatar, { backgroundColor: avatar.bg }]}>
        <Text style={[styles.avatarText, { color: avatar.fg }]}>{getInitials(contact.name)}</Text>
      </View>
      <View style={styles.rowInfo}>
        <Text style={styles.rowName} numberOfLines={1}>{contact.name}</Text>
        <Text style={styles.rowDept} numberOfLines={1}>{getDepartmentName(contact.departmentId)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={15} color="#d4a0aa" />
    </TouchableOpacity>
  );
}

export function HomeTab({ contacts, onSelect }: Props) {
  const groups = groupByLetter(contacts);

  // Flatten groups into a single list for FlatList with section headers
  type ListItem =
    | { type: "header"; letter: string; key: string }
    | { type: "contact"; contact: Contact; key: string };

  const listData: ListItem[] = [];
  for (const group of groups) {
    listData.push({ type: "header", letter: group.letter, key: `h-${group.letter}` });
    for (const c of group.data) {
      listData.push({ type: "contact", contact: c, key: `c-${c.id}` });
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Red Opal Innovations</Text>
        <Text style={styles.headerTitle}>Directory</Text>
        <Text style={styles.headerSub}>
          {contacts.length} {contacts.length === 1 ? "staff member" : "staff members"}
        </Text>
      </View>

      {/* List */}
      {contacts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No staff members yet</Text>
          <Text style={styles.emptySub}>Use the Actions tab to add your first contact.</Text>
        </View>
      ) : (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            if (item.type === "header") {
              return (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionLetter}>{item.letter}</Text>
                  <View style={styles.sectionDivider} />
                </View>
              );
            }
            return <ContactRow contact={item.contact} onSelect={onSelect} />;
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f5f5",
  },
  header: {
    backgroundColor: "#b8213a",
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  listContent: {
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f8f5f5",
  },
  sectionLetter: {
    fontSize: 13,
    fontWeight: "700",
    color: "#b8213a",
    width: 20,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(184,33,58,0.12)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(184,33,58,0.08)",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "700",
  },
  rowInfo: {
    flex: 1,
  },
  rowName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a0a0d",
  },
  rowDept: {
    fontSize: 12,
    color: "#7a4a52",
    marginTop: 2,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a0a0d",
    textAlign: "center",
  },
  emptySub: {
    fontSize: 13,
    color: "#7a4a52",
    textAlign: "center",
  },
});
