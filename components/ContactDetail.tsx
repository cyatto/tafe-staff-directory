import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ScaledText as Text } from "./AppText";
import { Ionicons } from "@expo/vector-icons";
import { Contact, getAvatarStyle, getInitials, getDepartmentName } from "../types";

interface Props {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onBack: () => void;
}

export function ContactDetail({ contact, onEdit, onDelete, onBack }: Props) {
  const avatar = getAvatarStyle(contact.name);

  const addressLines = [
    contact.street,
    `${contact.city} ${contact.state} ${contact.zip}`,
    contact.country,
  ].filter(Boolean);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={16} color="rgba(255,255,255,0.75)" />
          <Text style={styles.backText}>Directory</Text>
        </TouchableOpacity>

        <View style={styles.heroArea}>
          <View style={[styles.avatar, { backgroundColor: avatar.bg }]}>
            <Text style={[styles.avatarText, { color: avatar.fg }]}>{getInitials(contact.name)}</Text>
          </View>
          <Text style={styles.heroName}>{contact.name}</Text>
          <Text style={styles.heroDept}>{getDepartmentName(contact.departmentId)}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(contact)} activeOpacity={0.8}>
              <Ionicons name="pencil" size={13} color="#931c21" />
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(contact)} activeOpacity={0.8}>
              <Ionicons name="trash-outline" size={13} color="#fff" />
              <Text style={styles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Details card */}
      <View style={styles.card}>
        {/* Phone */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="call-outline" size={15} color="#931c21" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{contact.phone}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Department */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="business-outline" size={15} color="#931c21" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Department</Text>
            <Text style={styles.detailValue}>{getDepartmentName(contact.departmentId)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Address */}
        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="location-outline" size={15} color="#931c21" />
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.detailLabel}>Address</Text>
            {addressLines.map((line, i) => (
              <Text key={i} style={styles.detailValue}>{line}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* ID badge */}
      <View style={styles.idBadge}>
        <Text style={styles.idText}>ID #{contact.id}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f5f5" },
  content: { paddingBottom: 32 },
  header: {
    backgroundColor: "#931c21",
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 28,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  backText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
  },
  heroArea: {
    alignItems: "center",
    gap: 6,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.25)",
    marginBottom: 4,
  },
  avatarText: { fontSize: 28, fontWeight: "700" },
  heroName: { fontSize: 22, fontWeight: "700", color: "#fff", letterSpacing: -0.5 },
  heroDept: { fontSize: 14, color: "rgba(255,255,255,0.7)" },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
  },
  editBtnText: { fontSize: 13, fontWeight: "700", color: "#931c21" },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
  },
  deleteBtnText: { fontSize: 13, fontWeight: "700", color: "#fff" },
  card: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.08)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  detailIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#fdf0f2",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#7a4a52",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a0a0d",
    lineHeight: 20,
  },
  addressBlock: { flex: 1 },
  divider: {
    height: 1,
    backgroundColor: "rgba(147,28,33,0.07)",
    marginLeft: 16,
  },
  idBadge: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(147,28,33,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
  },
  idText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#d4a0aa",
  },
});
