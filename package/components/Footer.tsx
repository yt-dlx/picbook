// components/Footer.tsx
import Colorizer from "./Colorizer";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// ==============================================(picBook™)==============================================
// ==============================================(picBook™)==============================================
const Footer: React.FC = () => (
  <View style={{ backgroundColor: Colorizer("#0A0A0A", 1.0) }} className="relative w-full py-4">
    <View className="flex flex-col sm:flex-row items-center justify-between px-4">
      <View className="flex-row items-center gap-2">
        <FontAwesome name="book" size={16} style={{ color: Colorizer("#cdd6f4", 1.0) }} />
        <Text style={{ fontFamily: "Kurale", color: Colorizer("#cdd6f4", 1.0) }} className="font-semibold text-sm">
          picBook™
        </Text>
      </View>
      <Text style={{ fontFamily: "Kurale", color: Colorizer("#a6adc8", 1.0) }} className="text-center text-xs">
        Crafted with imagination and stories. All rights reserved.
      </Text>
    </View>
  </View>
);
export default Footer;
