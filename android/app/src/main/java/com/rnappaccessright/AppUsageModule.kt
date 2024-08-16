package com.myapp

import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import java.util.*

class AppUsageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AppUsageModule"
    }

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    @ReactMethod
    fun getUsageStats(startTime: Double, endTime: Double, promise: Promise) {
        val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val usageStatsList = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime.toLong(), endTime.toLong())

        if (usageStatsList == null || usageStatsList.isEmpty()) {
            promise.reject("No data", "No usage statistics available")
            return
        }

        val result = Arguments.createArray()
        for (usageStats in usageStatsList) {
            val map = Arguments.createMap()
            map.putString("packageName", usageStats.packageName)
            map.putDouble("totalTimeInForeground", usageStats.totalTimeInForeground.toDouble())
            result.pushMap(map)
        }

        promise.resolve(result)
    }
}
