import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Contact, DEPARTMENTS, getAvatarStyle, getInitials, getDepartmentName } from "../types";

interface Props {
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}

export function SearchTab({ contacts, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState<number | null>(null);

  const hasFilter = query.trim() !== "" || deptFilter !== null;

  const results = contacts
    .filter((c) => {
      const q = query.toLowerCase().trim();
      const matchQuery =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        getDepartmentName(c.departmentId).toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q);
      const matchDept = deptFilter === null || c.departmentId === deptFilter;
      return matchQuery && matchDept;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const clearAll = () => {
    setQuery("");
    setDeptFilter(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Red Opal Innovations</Text>
        <Text style={styles.headerTitle}>Search</Text>
        {/* Search input */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={15} color="#7a4a52" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Name, phone, department, city…"
            placeholderTextColor="#d4a0aa"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")} style={styles.clearBtn}>
              <Ionicons name="close" size={14} color="#7a4a52" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Department filter chips */}
      <View style={styles.filterBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          <TouchableOpacity
            onPress={() => setDeptFilter(null)}
            style={[styles.chip, deptFilter === null && styles.chipActive]}
          >
            <Text style={[styles.chipText, deptFilter === null && styles.chipTextActive]}>All</Text>
          </TouchableOpacity>
          {DEPARTMENTS.map((d) => (
            <TouchableOpacity
              key={d.id}
              onPress={() => setDeptFilter(deptFilter === d.id ? null : d.id)}
              style={[styles.chip, deptFilter === d.id && styles.chipActive]}
            >
              <Text style={[styles.chipText, deptFilter === d.id && styles.chipTextActive]}>
                {d.id === 1 ? "ICT" : d.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {hasFilter && (
          <View style={styles.filterMeta}>
            <Text style={styles.filterCount}>
              {results.length} {results.length === 1 ? "result" : "results"}
              {deptFilter !== null && (
                <Text style={styles.filterDeptName}> in {getDepartmentName(deptFilter)}</Text>
              )}
            </Text>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearAll}>Clear all</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Results / empty states */}
      {!hasFilter ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="search" size={22} color="#d4a0aa" />
          </View>
          <Text style={styles.emptyTitle}>Find a staff member</Text>
          <Text style={styles.emptySub}>Type a name, phone number, or city above</Text>
        </View>
      ) : results.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Ionicons name="close" size={22} color="#d4a0aa" />
          </View>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySub}>Try different keywords or clear the department filter</Text>
          <TouchableOpacity onPress={clearAll} style={styles.clearBtn2}>
            <Text style={styles.clearBtn2Text}>Clear filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(c) => String(c.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const avatar = getAvatarStyle(item.name);
            return (
              <TouchableOpacity style={styles.row} onPress={() => onSelect(item)} activeOpacity={0.75}>
                <View style={[styles.avatar, { backgroundColor: avatar.bg }]}>
                  <Text style={[styles.avatarText, { color: avatar.fg }]}>{getInitials(item.name)}</Text>
                </View>
                <View style={styles.rowInfo}>
                  <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.rowDept} numberOfLines={1}>{getDepartmentName(item.departmentId)}</Text>
                  <Text style={styles.rowPhone}>{item.phone}</Text>
                </View>
                <Ionicons name="chevron-forward" size={15} color="#d4a0aa" />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f5f5" },
  header: {
    backgroundColor: "#b8213a",
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
    gap: 10,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 2,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
  },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: { marginRight: 6 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1a0a0d",
  },
  clearBtn: { padding: 4 },
  filterBar: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "rgba(184,33,58,0.08)",
  },
  chips: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    flexDirection: "row",
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: "#fdf0f2",
  },
  chipActive: { backgroundColor: "#b8213a" },
  chipText: { fontSize: 11, fontWeight: "600", color: "#7a4a52" },
  chipTextActive: { color: "#fff" },
  filterMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filterCount: { fontSize: 12, color: "#7a4a52" },
  filterDeptName: { color: "#b8213a", fontWeight: "600" },
  clearAll: { fontSize: 12, fontWeight: "600", color: "#b8213a" },
  listContent: { padding: 16, gap: 8 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(184,33,58,0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 14, fontWeight: "700" },
  rowInfo: { flex: 1 },
  rowName: { fontSize: 14, fontWeight: "600", color: "#1a0a0d" },
  rowDept: { fontSize: 12, color: "#7a4a52", marginTop: 2 },
  rowPhone: { fontSize: 11, color: "#d4a0aa", marginTop: 1 },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 8,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fdf0f2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: { fontSize: 14, fontWeight: "600", color: "#1a0a0d" },
  emptySub: { fontSize: 12, color: "#7a4a52", textAlign: "center" },
  clearBtn2: {
    marginTop: 8,
    backgroundColor: "#fdf0f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
  },
  clearBtn2Text: { fontSize: 13, fontWeight: "600", color: "#b8213a" },
});
