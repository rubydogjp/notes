import 'package:flutter/material.dart';
import 'package:flutternote/nintendo/checkin_history_section.dart';
import 'package:flutternote/nintendo/colors.dart';
import 'package:flutternote/nintendo/fixtures.dart';
import 'package:flutternote/nintendo/gap.dart';
import 'package:flutternote/nintendo/play_history_section.dart';
import 'package:flutternote/nintendo/point_section.dart';
import 'package:flutternote/nintendo/sizes.dart';
import 'package:flutternote/nintendo/user_history_section.dart';

class MyPageBody extends StatelessWidget {
  const MyPageBody({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(Sizes.p20),
      color: MyColors.lightGrey,
      child: const Column(
        children: [
          PointSection(
            silverPoints: Fixtures.slverPoints,
            goldPoints: Fixtures.goldPoints,
          ),
          Gap.h14,
          UserHistorySection(
            exampleGameTilte: Fixtures.exampleGameTilte,
            examplePlayHistory: Fixtures.examplePlayHistory,
            exampleEventTilte: Fixtures.exampleEventTilte,
          ),
          Gap.h14,
          PlayHistorySection(),
          Gap.h14,
          CheckinHistorySection(),
        ],
      ),
    );
  }
}
